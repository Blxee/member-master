"""Module for the User class"""
from api.models.base import Base
from flask import Request
import bcrypt


def hash_str(text: str) -> str:
    """Hashed a string and returns result as a new string."""
    hashed = bcrypt.hashpw(
        text.encode(encoding='utf-8'),
        bcrypt.gensalt(),
    )
    hashed = hashed.decode(encoding='utf-8')
    return hashed


class User(Base):
    """Class User, the basis for the Owner and Client classes."""
    table_name = 'users'
    fields = (*Base.fields, 'email', 'password') # == (id, email, password)

    def __init__(self, **kwargs):
        if 'raw_password' in kwargs:
            raw_password = kwargs['raw_password']
            kwargs['password'] = hash_str(raw_password)
            del kwargs['raw_password']
        super().__init__(**kwargs)

    def is_password_valid(self, raw_password: str) -> bool:
        """Verifies whether the password is correct by hashing."""
        if not hasattr(self, 'password'):
            return False
        hashed = hash_str(raw_password)
        return self.password == hashed
