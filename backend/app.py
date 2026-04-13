from flask import Flask
from flask_cors import CORS
from config import Config
from database import init_db
from routes import api


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Enable CORS
    CORS(app, origins=Config.CORS_ORIGINS)
    
    # Initialize database
    init_db()
    
    # Register blueprints
    app.register_blueprint(api)
    
    # Health check
    @app.route('/health', methods=['GET'])
    def health():
        return {'status': 'healthy'}, 200
    
    app.health = health  # Export health function
    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=Config.DEBUG, port=5000)