"""Module for the Subscription class defintion."""
from datetime import date
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

    def __init__(self, **kwargs):
        if kwargs.get('joined') is None:
            kwargs['joined'] = date.today()
        if kwargs.get('last_paid') is None:
            kwargs['last_paid'] = date.today()
        super().__init__(**kwargs)
