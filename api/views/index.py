from flask import Blueprint, current_app, jsonify


index_routes = Blueprint('index', __name__, url_prefix='/api')


@index_routes.route('/status', methods=['GET'], strict_slashes=False)
def status():
    return jsonify({'status': 'success', 'message': 'server is running'})


@index_routes.route('/', methods=['GET'], strict_slashes=False)
def index():
    return 'hello back ' + current_app.config['DB_NAME']
