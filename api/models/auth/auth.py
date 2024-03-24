"""Module for abstract authentication class."""
from flask import Request


class Auth:
    def __init__(self):
        pass

    def login_user(self, request: Request):
        pass

    def register_user(self, request: Request):
        pass

    def logout_user(self, request: Request):
        pass

    def get_auth_user(self, request: Request):
        pass
