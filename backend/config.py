import os
from dotenv import load_dotenv

load_dotenv()

class Config:
      DB_PATH = 'data/taxstorks.db'
      DEBUG = os.getenv('FLASK_ENV') == 'development'
      CORS_ORIGINS = [
      'http://localhost:3000',
      'https://ConstantlyTrying989.github.io',
      'https://ConstantlyTrying989.github.io/taxstorks'
  ]