"""Module for Base class."""
import my


class Base:
    """Base model handles CRUD operation on the database."""
    def __init__(self, **kwargs) -> None:
        self.id = None
        self.date_created = None
        self.date_updated = None
        pass

    def save(self):
        pass

    def delete(self):
        pass

    @classmethod
    def all(cls):
        pass

    @classmethod
    def get(cls, id):
        pass

    @classmethod
    def search(cls, **kwargs):
        pass
