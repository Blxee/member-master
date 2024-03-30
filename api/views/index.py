from flask import Blueprint, current_app, jsonify, send_from_directory


index_routes = Blueprint('index', __name__)


@index_routes.route('/api/status', methods=['GET'], strict_slashes=False)
def status():
    return jsonify({'status': 'success', 'message': 'server is running'})


@index_routes.route('/media/<path:file_path>', methods=['GET'], strict_slashes=False)
def media(file_path):
    # TODO: fix directory traversal exploit
    return send_from_directory(current_app.config['MEDIA_ROOT'], file_path)
