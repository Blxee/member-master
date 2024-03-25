from flask import Blueprint, current_app, jsonify, make_response, request

from api.models.user import User


users_routes = Blueprint('users', __name__, url_prefix='/api/users')


@users_routes.route('/sign-up', methods=['POST'], strict_slashes=False)
def sign_up():
    response = make_response()
    response.headers['Content-Type'] = 'application/json'

    email = request.json.get('email')
    password = request.json.get('password')
    user = User(email=email, password=password)

    if user.save():
        response.status_code = 200
        response.data = jsonify({
            'status': 'success',
            'message': 'user created successfully',
        })
    else:
        response.status_code = 400
        response.data = jsonify({
            'status': 'error',
            'message': 'user could not be created',
        })
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
        })
    else:
        response.status_code = 401
        response.data = jsonify({
            'status': 'error',
            'message': 'user could not be authorized',
        })
    return response


@users_routes.route('/sign-out', methods=['DELETE'], strict_slashes=False)
def sign_out():
    """Sign the user out by removing the token from the server and client."""
    response = make_response()
    response.headers['Content-Type'] = 'application/json'
    result = current_app.auth.logout_user(request, response)
    if result == True:
        response.status_code = 200
        response.data = jsonify({
            'status': 'success',
            'message': 'user signed out successfully',
        })
    else:
        response.status_code = 401
        response.data = jsonify({
            'status': 'error',
            'message': 'user could not be authorized',
        })
    return response
