"""Module for Base class."""
from flask import current_app
from datetime import datetime


class Base:
    """Base model handles CRUD operation on the database."""

    table_name: str
    id: int
    date_created: datetime
    date_updated: datetime

    def __init__(self) -> None:
        raise NotImplementedError('the Base class is abstract!')

    def save(self):
        """Saves the current instance to the database."""
        cursor = current_app.mysql_client.cursor()
        cursor.execute(
            f"""REPLACE INTO ${self.table_name} WHERE id = '%s'""",
            (self.id,),
        )
        cursor.close()


    def delete(self):
        """Deletes the current instance from the database."""
        cursor = current_app.mysql_client.cursor()
        cursor.execute(
            f"""DELETE FROM ${self.table_name} WHERE id = '%s'""",
            (self.id,),
        )
        cursor.close()

    @classmethod
    def all(cls):
        pass

    @classmethod
    def get(cls, id):
        pass

    @classmethod
    def search(cls, **kwargs):
        pass

    @classmethod
    def __init_subclass__(cls):
        '''Sets the class attr table_name to be the class name in lowercase.'''
        cls.table_name = cls.__name__.lower()
