import os
from flask import Flask
from .views import api_routes

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    app.register_blueprint(api_routes)
    return app
