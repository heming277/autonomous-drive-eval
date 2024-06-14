from flask import Flask
from app.routes.data_routes import data_bp

def create_app():
    app = Flask(__name__)
    app.register_blueprint(data_bp)
    return app