from flask import Blueprint, current_app


index_routes = Blueprint('index', __name__, url_prefix='/api')


@index_routes.route('/', methods=['GET'], strict_slashes=False)
def index():
    return 'hello back ' + current_app.config['DB_NAME']
