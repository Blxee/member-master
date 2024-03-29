"""Module for the User class"""
from api.models.base import Base
from flask import current_app
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
        return bcrypt.checkpw(
            raw_password.encode('utf-8'),
            self.password.encode('utf-8')
        )

    def get_owned_businesses(self):
        """Get all businesses owned by current user."""
        from api.models.business import Business
        conn = current_app.mysql_client.get_connection()
        cursor = conn.cursor()
        cursor.execute(
            f"""
            SELECT businesses.* FROM businesses
            JOIN users          ON businesses.owner_id = users.id
            WHERE businesses.owner_id = %s
            """,
            (self.id,))

        users = []
        col_names, *_ = zip(*cursor.description)
        for row in cursor.fetchall():
            kwargs = {
                col_names[i]: row[i]
                for i in range(len(col_names))
            }
            instance = Business(**kwargs)
            users.append(instance)

        cursor.close()
        conn.close()
        return users
