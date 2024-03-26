"""Module for the Business class defintion."""
from flask import current_app
from api.models.base import Base


class Business(Base):
    """Business class represents a business owned by a User"""
    table_name = 'businesses'
    fields = (*Base.fields, 'name', 'logo', 'owner_id') # == (id, name, logo, owner_id)

    def get_clients(self):
        """Get all clients subscribed to this business."""
        from api.models.user import User
        cursor = current_app.mysql_client.cursor()
        cursor.execute(
            f"""
            SELECT users.*        FROM users
            JOIN business_clients ON users.id = business_clients.client_id
            JOIN businesses       ON business_clients.business_id = businesses.id
            WHERE businesses.id = %s
            """,
            (self.id,))

        users = []
        col_names, *_ = zip(*cursor.description)
        for row in cursor.fetchall():
            kwargs = {
                col_names[i]: row[i]
                for i in range(len(col_names))
            }
            instance = User(**kwargs)
            users.append(instance)

        cursor.close()
        return users
