"""Module for Base class."""
from flask import current_app
from datetime import datetime


class Base:
    """Base model handles CRUD operation on the database."""

    _initailized = False

    fields = ('id',)
    table_name: str
    max_id: int

    def __init__(self, **kwargs):
        if not self._initailized:
            raise NotImplementedError('the Base class is abstract!')
        self._id = self.max_id
        self._date_created = datetime.now()
        self._date_updated = datetime.now()
        self.max_id += 1

    @classmethod
    def __init_subclass__(cls):
        """Allows only deriving classes to be _initailized."""
        if not cls._initailized:
            cls._initailized = True

    def __setattr__(self, name, value):
        """Magic method to prevent adding properties to instances."""
        if name not in self.fields:
            raise AttributeError(
                'cannot set other attribures than those already defined'
            )
        super().__setattr__(name, value)

    def to_dict(self) -> dict:
        """Collects all the relavant fields into a dict."""
        dic = {
            key: self.__dict__.get(key)
            for key in self.fields
        }
        return dic

    def save(self):
        """Saves the current instance to the database."""
        dic = self.to_dict()
        # zip is important for maintaining order
        keys, values = tuple(zip(*dic.items()))

        cursor = current_app.mysql_client.cursor()
        cursor.execute(
            f"""
            REPLACE INTO {self.table_name} ({','.join(keys)})
            VALUES ({'%s,' * len(values)}) WHERE id = '%s'
            """,
            (*values, self._id),
        )
        cursor.close()

    def delete(self):
        """Deletes the current instance from the database."""
        cursor = current_app.mysql_client.cursor()
        cursor.execute(
            f"""DELETE FROM ${self.table_name} WHERE id = '%s'""",
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
