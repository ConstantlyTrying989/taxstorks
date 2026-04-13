from database import get_db
import datetime


class Question:
      CATEGORIES = ['self-employed', 'investments', 'filing', 'deductions', 'other']
      
      @staticmethod
      def create(title, content, category, author_name=None):
          db = get_db()
          c = db.cursor()
          c.execute('''
              INSERT INTO questions (title, content, category, author_name)
              VALUES (?, ?, ?, ?)
          ''', (title, content, category, author_name or 'Anonymous'))
          db.commit()
          question_id = c.lastrowid
          db.close()
          return question_id
      
      @staticmethod
      def get_all(page=1, category=None, search=None):
          db = get_db()
          c = db.cursor()
          
          query = 'SELECT * FROM questions WHERE is_archived = 0'
          params = []
          
          if category:
              query += ' AND category = ?'
              params.append(category)
          
          if search:
              query += ' AND (title LIKE ? OR content LIKE ?)'
              search_term = f'%{search}%'
              params.extend([search_term, search_term])
          
          query += ' ORDER BY created_at DESC LIMIT 20 OFFSET ?'
          params.append((page - 1) * 20)
          
          c.execute(query, params)
          questions = [dict(row) for row in c.fetchall()]
          db.close()
          return questions
      
      @staticmethod
      def get_by_id(question_id):
          db = get_db()
          c = db.cursor()
          c.execute('SELECT * FROM questions WHERE id = ?', (question_id,))
          question = dict(c.fetchone() or {})
          db.close()
          return question


class Answer:
      @staticmethod
      def create(question_id, content, author_name=None):
          db = get_db()
          c = db.cursor()
          c.execute('''
              INSERT INTO answers (question_id, content, author_name)
              VALUES (?, ?, ?)
          ''', (question_id, content, author_name or 'Anonymous'))
          db.commit()
          answer_id = c.lastrowid
          db.close()
          return answer_id
      
      @staticmethod
      def get_by_question(question_id):
          db = get_db()
          c = db.cursor()
          c.execute('''
              SELECT * FROM answers 
              WHERE question_id = ? 
              ORDER BY created_at ASC
          ''', (question_id,))
          answers = [dict(row) for row in c.fetchall()]
          db.close()
          return answers