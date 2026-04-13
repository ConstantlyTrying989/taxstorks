from flask import Blueprint, request, jsonify
  from models import Question, Answer
  import json
  
  api = Blueprint('api', __name__, url_prefix='/api')
  
  # CATEGORIES
  @api.route('/categories', methods=['GET'])
  def get_categories():
      return jsonify(Question.CATEGORIES)
  
  # QUESTIONS
  @api.route('/questions', methods=['GET'])
  def get_questions():
      page = request.args.get('page', 1, type=int)
      category = request.args.get('category')
      search = request.args.get('search')
      
      questions = Question.get_all(page=page, category=category, search=search)
      
      # Add answer counts
      for q in questions:
          answers = Answer.get_by_question(q['id'])
          q['answer_count'] = len(answers)
      
      return jsonify(questions)
  
  @api.route('/questions/<int:question_id>', methods=['GET'])
  def get_question(question_id):
      question = Question.get_by_id(question_id)
      if not question:
          return jsonify({'error': 'Question not found'}), 404
      
      answers = Answer.get_by_question(question_id)
      question['answers'] = answers
      
      return jsonify(question)
  
  @api.route('/questions', methods=['POST'])
  def create_question():
      data = request.get_json()
      
      # Validation
      if not data.get('title') or not data.get('content'):
          return jsonify({'error': 'Title and content required'}), 400
      
      if data.get('category') not in Question.CATEGORIES:
          return jsonify({'error': 'Invalid category'}), 400
      
      question_id = Question.create(
          title=data['title'],
          content=data['content'],
          category=data['category'],
          author_name=data.get('author_name')
      )
      
      return jsonify({
          'id': question_id,
          'message': 'Question created successfully'
      }), 201
  
  # ANSWERS
  @api.route('/questions/<int:question_id>/answers', methods=['GET'])
  def get_answers(question_id):
      answers = Answer.get_by_question(question_id)
      return jsonify(answers)
  
  @api.route('/questions/<int:question_id>/answers', methods=['POST'])
  def create_answer(question_id):
      data = request.get_json()
      
      # Validation
      if not data.get('content'):
          return jsonify({'error': 'Content required'}), 400
      
      # Check question exists
      if not Question.get_by_id(question_id):
          return jsonify({'error': 'Question not found'}), 404
      
      answer_id = Answer.create(
          question_id=question_id,
          content=data['content'],
          author_name=data.get('author_name')
      )
      
      return jsonify({
          'id': answer_id,
          'message': 'Answer created successfully'
      }), 201