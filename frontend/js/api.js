// Configuration
  const API_BASE_URL = process.env.NODE_ENV === 'production' 
      ? 'https://taxstorks-api.render.com/api'
      : 'http://localhost:5000/api';
  
  class TaxStorksAPI {
      async getCategories() {
          const response = await fetch(`${API_BASE_URL}/categories`);
          return response.json();
      }
  
      async getQuestions(page = 1, category = null, search = null) {
          let url = `${API_BASE_URL}/questions?page=${page}`;
          if (category) url += `&category=${category}`;
          if (search) url += `&search=${encodeURIComponent(search)}`;
          
          const response = await fetch(url);
          return response.json();
      }
  
      async getQuestion(id) {
          const response = await fetch(`${API_BASE_URL}/questions/${id}`);
          return response.json();
      }
  
      async createQuestion(title, content, category, authorName = null) {
          const response = await fetch(`${API_BASE_URL}/questions`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ title, content, category, author_name: authorName })
          });
          return response.json();
      }
  
      async createAnswer(questionId, content, authorName = null) {
          const response = await fetch(`${API_BASE_URL}/questions/${questionId}/answers`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ content, author_name: authorName })
          });
          return response.json();
      }
  
      async getAnswers(questionId) {
          const response = await fetch(`${API_BASE_URL}/questions/${questionId}/answers`);
          return response.json();
      }
  }
  
  const api = new TaxStorksAPI();
