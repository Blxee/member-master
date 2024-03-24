from flask import Blueprint, jsonify


users_routes = Blueprint('users', __name__, url_prefix='/api/users')


@users_routes.route('/sign-up', methods=['POST'], strict_slashes=False)
def sign_up():
    res = jsonify()
    return res


@users_routes.route('/sign-in', methods=['POST'], strict_slashes=False)
def sign_in():
    return 'signed in successfully'


@users_routes.route('/sign-out', methods=['DELETE'], strict_slashes=False)
def sign_out():
    """Sign the user out by removing the token from the server and client."""
    res = jsonify({ 'status': 'success', 'message': 'user signed out successfully' })
    res.status_code = 200
    # delete the token from cookies by replacing with empty string
    res.set_cookie('X-Token', '')
    return res
