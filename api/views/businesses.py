"""Module defining Business class related routes."""
from os import path
from flask import Blueprint, current_app, jsonify, request
from werkzeug.utils import secure_filename
from api.models.business import Business
from api.utils import require_auth
from pathlib import Path


businesses_routes = Blueprint('businesses', __name__, url_prefix='/api/businesses')


@businesses_routes.route('/all', methods=['GET'], strict_slashes=False)
@require_auth
def all_businesses():
    """Retrieve all businesses from the database."""
    businesses = Business.all()
    businesses = list(map(lambda b: b.to_dict(), businesses))
    return jsonify(businesses), 200


@businesses_routes.route('/<business_id>', methods=['GET'], strict_slashes=False)
@require_auth
def get_business(business_id):
    """Retrieve a businesses from the database using its id."""
    business = Business.search(business_id=business_id)
    if not business:
        return jsonify({
            'status': 'error',
            'message': 'no such business exists',
        }), 400
    business = business[0].to_dict()
    return jsonify(business), 200


@businesses_routes.route('/<business_id>/clients/all', methods=['GET'], strict_slashes=False)
@require_auth
def all_clients(business_id):
    """Retrieve all clients subscribed to a business."""
    business = Business.search(id=business_id)
    if not business:
        return jsonify({
            'status': 'error',
            'message': 'no such business exists',
        }), 400
    business = business[0]
    clients = business.get_clients()
    clients = list(map(lambda c: c.to_dict(), clients)) # TODO: make it so hash_pwd is not sent
    return jsonify(clients), 200


@businesses_routes.route('/add', methods=['POST'], strict_slashes=False)
@require_auth
def add_business():
    """Creates a new business in the datadase."""
    fields = {'name', 'description', 'address'}
    fields_required = {'name',}
    form_data = {
        key: val
        for key, val in request.form.items()
        if key in fields
    }

    if not fields_required.issubset(set(form_data)):
        return jsonify({
            'status': 'error',
            'message': 'some fields are missing',
        }), 400

    business = Business(**form_data, owner_id=current_app.auth_user.id)
    business.save() # save to create the auto increment ID

    image_file = request.files.get('logo')
    if image_file is not None and image_file.filename is not None:
        # TODO: make logo extention match the uploaded
        file_path = path.join(business.get_media_path(), secure_filename(image_file.filename))
        image_file.save(path.join('api', current_app.config['MEDIA_ROOT'], file_path))
        business.logo = path.join('/media', file_path)

    business.save()

    return jsonify({
        'status': 'success',
        'message': 'a new bussiness has been successfully added',
    }), 200
