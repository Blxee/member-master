from flask import Blueprint, jsonify


users_routes = Blueprint('users', __name__, url_prefix='/api/users')


@users_routes.route('/sign-up', methods=['POST'], strict_slashes=False)
def sign_up():
    res = jsonify()
    res.set_cookie('auth-token', '')
    return res


@users_routes.route('/sign-in', methods=['POST'], strict_slashes=False)
def sign_in():
    return 'signed in successfully'
