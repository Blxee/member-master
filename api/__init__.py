import os
from flask import Flask
from api.views.users import users_routes
from api.views.index import index_routes

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    app.config.from_pyfile(os.path.join(app.instance_path, 'config.py'))

    app.register_blueprint(users_routes)
    app.register_blueprint(index_routes)

    return app
