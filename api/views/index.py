from os import path
from flask import Blueprint, abort, current_app, jsonify, send_file, send_from_directory


index_routes = Blueprint('index', __name__)


@index_routes.route('/api/status', methods=['GET'], strict_slashes=False)
def status():
    return jsonify({'status': 'success', 'message': 'server is running'})


@index_routes.route('/media/<path:file_path>', methods=['GET'], strict_slashes=False)
def media(file_path: str):
    full_path = path.join('api', current_app.config['MEDIA_ROOT'], file_path)
    if path.isdir(full_path):
        abort(403)
    return send_from_directory(current_app.config['MEDIA_ROOT'], file_path)
