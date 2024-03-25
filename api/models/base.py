"""Module for Base class."""
from flask import current_app
from datetime import datetime


class Base:
    """Base model handles CRUD operation on the database."""

    _initailized = False

    fields = ('id',)
    table_name: str

    def __init__(self, **kwargs):
        if not self._initailized:
            raise NotImplementedError('the Base class is abstract!')
        for key, val in kwargs.items():
            setattr(self, key, val)
        # self.id = max_id
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
            VALUES ({('%s,' * len(values))[:-1]})
            """,
            values,
        )
        cursor.close()
        current_app.mysql_client.commit()
        return True

    def delete(self):
        """Deletes the current instance from the database."""
        cursor = current_app.mysql_client.cursor()
        cursor.execute(
            f"""DELETE FROM {self.table_name} WHERE id = %s""",
            (self.id,),
        )
        cursor.close()
        current_app.mysql_client.commit()

    @classmethod
    def all(cls):
        pass

    @classmethod
    def get(cls, id):
        pass

    @classmethod
    def search(cls, **kwargs):
        """Filter search throught db and return instances as list."""
        keys, values = tuple(zip(*kwargs.items()))

        # if kwargs contains field which aren't in the db
        if not set(keys).issubset(set(cls.fields)):
            return None
        
        cursor = current_app.mysql_client.cursor()
        query_fields = ','.join(keys)
        query_search = ('%s,' * len(values))[:-1]
        cursor.execute(
            f"""
            SELECT * FROM {cls.table_name}
            WHERE ({query_fields}) = ({query_search})
            """,
            values)

        users = []
        col_names, *_ = zip(*cursor.description)
        for row in cursor.fetchall():
            kwargs = {
                col_names[i]: row[i]
                for i in range(len(col_names))
            }
            instance = cls(**kwargs)
            users.append(instance)

        cursor.close()
        return users
