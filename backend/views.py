from flask import Blueprint

api_routes = Blueprint('views', __name__, url_prefix='/api')

@api_routes.route('/', methods=['GET'], strict_slashes=False)
def index():
    return 'hello back'
