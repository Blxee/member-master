"""Module for TokenAuth class."""
from api.models.auth.auth import Auth
from flask import Request, Response, current_app
from api.models.user import User
from uuid import uuid4


class TokenAuth(Auth):
    """Class implementing token based authentication."""

    def __init__(self):
        pass

    def get_token(self, request: Request) -> str | None:
        """Returns the token header value from the request or None."""
        return request.cookies.get('X-Token')

    def get_user_id(self, request: Request) -> str | None:
        """Returns the user id cached in redis if exists of None"""
        token = self.get_token(request)
        if token is None:
            return None
        key = f'auth_{token}'
        user_id = current_app.redis_client.get(key)
        if user_id:
            return user_id.decode('utf-8')

    def login_user(self, request: Request, respose: Response) -> User | None:
        """
        Caches a new auth token for the provided user (as json),
        and sets a token cookie.

        Returns:
            User | None: whether the operation succeeds or not.
        """
        body = request.get_json()
        email = body.get('email')
        password = body.get('password')
        if email is None or password is None:
            return None

        users = User.search(email=email)
        if not users:
            return None

        user = users[0]
        if not user.is_password_valid(password):
            return None

        token = str(uuid4())
        expiry = 60 * 60 * 24 * 7
        current_app.redis_client.setex(f'auth_{token}', expiry, user.id)
        respose.set_cookie('X-Token', token)
        return user

    def logout_user(self, request: Request, respose: Response) -> bool:
        """
        Removes the cached token and invalidates the token cookie.

        Returns:
            bool: whether the operation succeeds or not.
        """
        user_id = self.get_user_id(request)
        if user_id:
            token = self.get_token(request)
            current_app.redis_client.delete(f'auth_{token}')
            respose.set_cookie('X-Token', '')
            return True
        else:
            return False

    def current_user(self, request: Request) -> User | None:
        """Retrieves the currently logged user using the request."""
        user_id = self.get_user_id(request)
        users = User.search(id=user_id)
        if users is not None and len(users) > 0:
            return users[0]
