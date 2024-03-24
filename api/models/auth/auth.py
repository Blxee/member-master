"""Module for abstract authentication class."""
from flask import Request, Response


class Auth:
    def __init__(self):
        raise NotImplementedError('Auth is an abstract class, it should be derived from')

    def login_user(self, request: Request, respose: Response):
        raise NotImplementedError()

    def logout_user(self, request: Request, respose: Response):
        raise NotImplementedError()

    def current_user(self, request: Request):
        raise NotImplementedError()
