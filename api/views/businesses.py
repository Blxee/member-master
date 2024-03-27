"""Module defining Business class related routes."""
from flask import Blueprint, jsonify
from api.models.business import Business
from api.utils import require_auth


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
    business = business[0].to_dict()
    clients = business.get_clients()
    clients = list(map(lambda c: c.to_dict(), clients)) # TODO: make it so hash_pwd is not sent
    return jsonify(clients), 200
