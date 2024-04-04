"""Module defining Subscription class related routes."""
from flask import Blueprint, abort, current_app, jsonify, request
from werkzeug.utils import secure_filename
from api.models.business import Business
from api.models.subscription import Subscription
from api.utils import require_auth
from os import path


subscriptions_routes = Blueprint('subscriptions', __name__, url_prefix='/api/subs')


@subscriptions_routes.route('/add/<int:business_id>', methods=['POST'], strict_slashes=False)
@require_auth
def add_sub(business_id):
    """Creates a new subscription in the datadase."""
    businesses = Business.search(id=business_id)
    if len(businesses) == 0:
        return jsonify({
            'status': 'error',
            'message': 'there is no such business',
        }), 404

    business = businesses[0]
    if business.owner_id != current_app.auth_user.id:
        return jsonify({
            'status': 'error',
            'message': 'current user does not own this business',
        }), 404

    fields = set(Subscription.fields)
    fields_required = {'first_name', 'last_name'}
    form_data = {
        key: val
        for key, val in request.form.items()
        if key in fields
    }

    if 'assurance' in form_data:
        form_data['assurance'] = form_data['assurance'] == 'on'

    if not fields_required.issubset(set(form_data)):
        return jsonify({
            'status': 'error',
            'message': 'some fields are missing',
        }), 400

    # add client_id too to constructor
    sub = Subscription(**form_data, business_id=business_id)

    image_file = request.files.get('picture')
    if image_file is not None and image_file.filename is not None:
        # TODO: make logo extention match the uploaded
        file_path = path.join(sub.get_media_path(), secure_filename(image_file.filename))
        image_file.save(path.join('api', current_app.config['MEDIA_ROOT'], file_path))
        sub.picture = path.join('/media', file_path)

    sub.save()

    return jsonify({
        'status': 'success',
        'message': 'a new subscription has been successfully added',
    }), 200


@subscriptions_routes.route('/business/<int:business_id>', methods=['GET'], strict_slashes=False)
def business_subs(business_id):
    """Retrieves all subscriptions in a specific business."""
    subs = Subscription.search(business_id=business_id)
    subs = list(map(lambda s: s.to_dict(), subs))
    return jsonify(subs)


@subscriptions_routes.route('/user/<int:user_id>', methods=['GET'], strict_slashes=False)
def user_subs(user_id):
    """Retrieves all subscriptions of a specific user."""
    subs = Subscription.search(client_id=user_id)
    subs = list(map(lambda s: s.to_dict(), subs))
    return jsonify(subs)


@subscriptions_routes.route('/current', methods=['GET'], strict_slashes=False)
@require_auth
def current_user_subs():
    """Retrieves all subscriptions of the current authenticated user."""
    user_id = current_app.auth_user.id
    subs = Subscription.search(client_id=user_id)
    subs = list(map(lambda s: s.to_dict(), subs))
    return jsonify(subs)


@subscriptions_routes.route('/update/<int:business_id>:<int:client_id>', methods=['POST'], strict_slashes=False)
@require_auth
def update_sub(business_id, client_id):
    """Updates a sub using its business_id and client_id."""
    businesses = Business.search(id=business_id)
    if len(businesses) == 0:
        return jsonify({
            'status': 'error',
            'message': 'there is no such business',
        }), 404

    business = businesses[0]
    if business.owner_id != current_app.auth_user.id:
        return jsonify({
            'status': 'error',
            'message': 'current user does not own this business',
        }), 404

    fields = set(Subscription.fields)
    form_data = {
        key: val
        for key, val in request.form.items()
        if key in fields and key not in ('business_id', 'client_id')
    }

    if 'assurance' in form_data:
        form_data['assurance'] = form_data['assurance'] == 'on'

    subs = Subscription.search(business_id=business_id, client_id=client_id)
    if len(subs) == 0:
        return jsonify({
            'status': 'error',
            'message': 'there is no such subscription',
        }), 404

    sub = subs[0]

    sub.__dict__.update(**form_data)
    sub.save()

    return jsonify({
        'status': 'success',
        'message': 'subscription has been successfully updated',
    }), 200


@subscriptions_routes.route('/delete/<int:business_id>:<int:client_id>', methods=['DELETE'], strict_slashes=False)
@require_auth
def delete_sub(business_id, client_id):
    """Deletes a sub using its business_id and client_id."""
    user_id = current_app.auth_user.id

    subs = Subscription.search(business_id=business_id, client_id=client_id)

    if len(subs) == 0:
        return jsonify({
            'status': 'error',
            'message': 'there is no such subscription',
        }), 404

    sub = subs[0]

    # TODO: check whether current user owns this sub
    if False:
        return jsonify({
            'status': 'error',
            'message': 'none of the businesses you own contains this subscription',
        }), 404

    sub.delete()

    return jsonify({
        'status': 'success',
        'message': 'subscription deleted successfully'
    })
