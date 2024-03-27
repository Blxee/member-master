"""Module defining User class related routes."""
from flask import Blueprint, current_app, jsonify, make_response, request
from api.models.user import User
from api.utils import require_auth


users_routes = Blueprint('users', __name__, url_prefix='/api/users')


@users_routes.route('/sign-up', methods=['POST'], strict_slashes=False)
def sign_up():
    response = make_response()
    response.headers['Content-Type'] = 'application/json'

    email = request.json.get('email')
    password = request.json.get('password')

    if email is None or password is None:
        response.status_code = 400
        response.data = jsonify({
            'status': 'error',
            'message': 'invalid credentials',
        }).data
        return response

    user = User(email=email, raw_password=password)

    if user.save():
        response.status_code = 200
        response.data = jsonify({
            'status': 'success',
            'message': 'user created successfully',
        }).data
    else:
        response.status_code = 400
        response.data = jsonify({
            'status': 'error',
            'message': 'user could not be created',
        }).data
    return response


@users_routes.route('/sign-in', methods=['POST'], strict_slashes=False)
def sign_in():
    response = make_response()
    response.headers['Content-Type'] = 'application/json'

    result = current_app.auth.login_user(request, response)

    if result == True:
        response.status_code = 200
        response.data = jsonify({
            'status': 'success',
            'message': 'user signed in successfully',
        }).data
    else:
        response.status_code = 401
        response.data = jsonify({
            'status': 'error',
            'message': 'user could not be authorized',
        }).data
    return response


@users_routes.route('/sign-out', methods=['DELETE'], strict_slashes=False)
@require_auth
def sign_out():
    """Sign the user out by removing the token from the server and client."""
    response = make_response()
    response.headers['Content-Type'] = 'application/json'

    result = current_app.auth.logout_user(request, response)

    response.status_code = 200
    response.data = jsonify({
        'status': 'success',
        'message': 'user signed out successfully',
    }).data
    return response


@users_routes.route('/<user_id>', methods=['GET'], strict_slashes=False)
@require_auth
def get_user(user_id):
    """Retrieve a specific user."""
    user = User.search(id=user_id)
    if not user:
        return jsonify({
            'status': 'error',
            'message': 'no such user exists',
        }), 400
    user = user[0].to_dict() # TODO: don't send hash_pwd
    return jsonify(user), 200
