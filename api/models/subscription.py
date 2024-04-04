"""Module for the Subscription class defintion."""
from api.models.base import Base


class Subscription(Base):
    """Subscription class represents a subscriber relation to a business."""
    table_name = 'subscriptions'
    fields = (
        *Base.fields,
        'client_id', 'business_id',
        'first_name', 'last_name',
        'picture', 'email', 'phone', 'documents_dir',
        'joined', 'last_paid', 'assurance'
    )
