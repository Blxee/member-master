"""Module for Base class."""
from os import path
from flask import current_app
from datetime import datetime
from pathlib import Path


class Base:
    """Base model handles CRUD operation on the database."""

    _initailized = False

    fields = ('id',)
    table_name: str

    def __init__(self, **kwargs):
        if not self._initailized:
            raise NotImplementedError('the Base class is abstract!')
        self.id = None
        for key, val in kwargs.items():
            setattr(self, key, val)
        # self._date_created = datetime.now()
        # self._date_updated = datetime.now()

    @classmethod
    def __init_subclass__(cls):
        """Allows only deriving classes to be _initailized."""
        if not cls._initailized:
            cls._initailized = True

    def __setattr__(self, name, value):
        """Magic method to prevent adding properties to instances."""
        if name not in self.fields:
            raise AttributeError(
                f'cannot set other attribures than those in db shcema: {name}'
            )
        super().__setattr__(name, value)

    def to_dict(self) -> dict:
        """Collects all the relevant fields into a dict."""
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

        conn = current_app.mysql_client.get_connection()
        cursor = conn.cursor()
        cursor.execute(
            f"""
            REPLACE INTO {self.table_name} ({','.join(keys)})
            VALUES ({('%s,' * len(values))[:-1]})
            """,
            values,
        )
        self.id = cursor.lastrowid
        cursor.close()
        conn.commit()
        conn.close()
        return True

    def delete(self):
        """Deletes the current instance from the database."""
        conn = current_app.mysql_client.get_connection()
        cursor = conn.cursor()
        cursor.execute(
            f"""DELETE FROM {self.table_name} WHERE id = %s""",
            (self.id,),
        )
        cursor.close()
        conn.commit()
        conn.close()

    @classmethod
    def all(cls):
        """Fetches all instances of a class."""
        conn = current_app.mysql_client.get_connection()
        cursor = conn.cursor()
        cursor.execute(f"""SELECT * FROM {cls.table_name}""")

        models = []
        col_names, *_ = zip(*cursor.description)
        for row in cursor.fetchall():
            kwargs = {
                col_names[i]: row[i]
                for i in range(len(col_names))
            }
            instance = cls(**kwargs)
            models.append(instance)

        cursor.close()
        conn.close()
        return models

    @classmethod
    def get(cls, id):
        pass

    @classmethod
    def search(cls, **kwargs) -> list:
        """Filter search throught db and return instances as list."""
        keys, values = tuple(zip(*kwargs.items()))

        # if kwargs contains field which aren't in the db
        if not set(keys).issubset(set(cls.fields)):
            return None

        conn = current_app.mysql_client.get_connection()
        cursor = conn.cursor()
        query_fields = ','.join(keys)
        query_search = ('%s,' * len(values))[:-1]
        cursor.execute(
            f"""
            SELECT * FROM {cls.table_name}
            WHERE ({query_fields}) = ({query_search})
            """,
            values)

        models = []
        col_names, *_ = zip(*cursor.description)
        for row in cursor.fetchall():
            kwargs = {
                col_names[i]: row[i]
                for i in range(len(col_names))
            }
            instance = cls(**kwargs)
            models.append(instance)

        cursor.close()
        conn.close()
        return models

    
    def get_media_path(self) -> str:
        """Returns the media path dir for this user, or creates it."""
        # TODO: improve by caching the media dir from __init__
        if self.id is None:
            self.save()
        sub_path = path.join(self.table_name, f'{self.id}/')
        instance_path = Path('api', current_app.config['MEDIA_ROOT'], sub_path)
        instance_path.mkdir(parents=True, exist_ok=True)
        return sub_path
