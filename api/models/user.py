"""Module for the User class"""
from api.models.base import Base
from flask import Request


class User(Base):

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def is_password_valid(self, password):
        pass

    @classmethod
    def create_user(cls, request: Request):
        request.headers

    @classmethod
    def get_auth_user(cls, request: Request):
        request.headers
