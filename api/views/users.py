from flask import Blueprint


users_routes = Blueprint('users', __name__, url_prefix='/api/users')


@users_routes.route('/sign-up', methods=['POST'], strict_slashes=False)
def sign_up():
    return 'signed up successfully'


@users_routes.route('/sign-in', methods=['POST'], strict_slashes=False)
def sign_in():
    return 'signed in successfully'
