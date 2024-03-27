import os
from flask import Flask
from api.views.users import users_routes
from api.views.index import index_routes
from api.views.businesses import businesses_routes
from api.models.auth.auth import Auth
from api.models.auth.basic_auth import BasicAuth
from api.models.auth.token_auth import TokenAuth
from redis import Redis
import mysql.connector

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    app.config.from_pyfile(os.path.join(app.instance_path, 'config.py')) # handle this config file

    app.redis_client = Redis(
        host=app.config['REDIS_HOST'],
        port=app.config['REDIS_PORT'],
    )
    app.mysql_client = mysql.connector.connect(
        host=app.config['DB_HOST'],
        user=app.config['DB_USER'],
        password=app.config['DB_PASSWORD'],
        database=app.config['DB_NAME'],
    )

    if app.config['AUTH_TYPE'] == 'auth':
        app.auth = Auth()
    elif app.config['AUTH_TYPE'] == 'basic-auth':
        app.auth = BasicAuth()
    elif app.config['AUTH_TYPE'] == 'token-auth':
        app.auth = TokenAuth()

    app.register_blueprint(users_routes)
    app.register_blueprint(index_routes)
    app.register_blueprint(businesses_routes)

    return app
