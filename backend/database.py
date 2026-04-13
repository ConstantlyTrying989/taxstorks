import sqlite3
import os
from datetime import datetime

DB_PATH = 'data/taxstorks.db'

def init_db():
      os.makedirs('data', exist_ok=True)
      conn = sqlite3.connect(DB_PATH)
      c = conn.cursor()
      
      # Create tables
      c.execute('''
          CREATE TABLE IF NOT EXISTS questions (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              title TEXT NOT NULL,
              content TEXT NOT NULL,
              category TEXT NOT NULL,
              author_name TEXT,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              is_archived BOOLEAN DEFAULT 0
          )
      ''')
      
      c.execute('''
          CREATE TABLE IF NOT EXISTS answers (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              question_id INTEGER NOT NULL,
              content TEXT NOT NULL,
              author_name TEXT,
              helpful_count INTEGER DEFAULT 0,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (question_id) REFERENCES questions (id)
          )
      ''')
      
      conn.commit()
      conn.close()

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn