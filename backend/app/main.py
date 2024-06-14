#main.py
from dotenv import load_dotenv
import os
from flask import Flask
from flask_cors import CORS
from app.routes.data_routes import data_bp

# Load environment variables from .env file
load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes
    app.register_blueprint(data_bp)

    @app.route('/')
    def home():
        return "Welcome to the Autonomous Drive Evaluation API!"

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)