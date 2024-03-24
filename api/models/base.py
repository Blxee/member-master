"""Module for Base class."""
from flask import current_app
from datetime import datetime


class Base:
    """Base model handles CRUD operation on the database."""

    _initailized = False
    _table_name: str
    _max_id: int

    def __init__(self, **kwargs):
        if not self._initailized:
            raise NotImplementedError('the Base class is abstract!')
        self._id = self._max_id
        self._date_created = datetime.now()
        self._date_updated = datetime.now()
        self._max_id += 1


    @classmethod
    def __init_subclass__(cls):
        '''Sets the class attr table_name and initializes common fields.'''
        cls._table_name = cls.__name__.lower()
        if not cls._initailized:
            cls._initailized = True


    def save(self):
        """Saves the current instance to the database."""
        cursor = current_app.mysql_client.cursor()
        cursor.execute(
            f"""REPLACE INTO ${self._table_name} WHERE id = '%s'""",
            (self._id,),
        )
        cursor.close()


    def delete(self):
        """Deletes the current instance from the database."""
        cursor = current_app.mysql_client.cursor()
        cursor.execute(
            f"""DELETE FROM ${self._table_name} WHERE id = '%s'""",
            (self._id,),
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
