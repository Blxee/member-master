"""Module for various helpful utils."""
from flask import current_app, jsonify, request


def require_auth(fun):
    """Used to decorate routes which require authentication."""
    def inner(*args, **kwargs):
        auth_user = current_app.auth.current_user(request)
        if auth_user is None:
            return jsonify({
                'status': 'error',
                'message': 'user could not be authorized',
            }), 401
        return fun(*args, **kwargs)
    return inner
