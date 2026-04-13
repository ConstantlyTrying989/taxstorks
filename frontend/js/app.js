let currentPage = 'home';
  let allCategories = [];
  let currentCategory = null;
  let currentSearch = null;
  let currentPageNum = 1;
  
  async function init() {
      // Load categories
      allCategories = await api.getCategories();
      
      // Setup event listeners
      document.getElementById('nav-home').addEventListener('click', () => showHome());
      document.getElementById('nav-ask').addEventListener('click', () => showAskForm());
      
      // Load home
      showHome();
  }
  
  async function showHome() {
      currentPage = 'home';
      const mainContent = document.getElementById('main-content');
      
      // Hero section
      let html = `
          <section class="hero">
              <h1>Share Your Tax Wisdom</h1>
              <p>Get advice from the community. Help others with your knowledge.</p>
              <div class="search-filter">
                  <input type="text" id="search-input" placeholder="Search questions...">
                  <select id="category-filter">
                      <option value="">All Categories</option>
                      ${allCategories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                  </select>
                  <button onclick="applyFilters()">Search</button>
              </div>
          </section>
      `;
      
      // Questions list
      html += '<div id="questions-list"></div>';
      
      mainContent.innerHTML = html;
      
      // Load questions
      await loadQuestions();
      
      // Event listeners
      document.getElementById('search-input').addEventListener('keypress', (e) => {
          if (e.key === 'Enter') applyFilters();
      });
  }
  
  async function loadQuestions(page = 1) {
      const currentCategory = document.getElementById('category-filter')?.value || null;
      const currentSearch = document.getElementById('search-input')?.value || null;
      
      const questions = await api.getQuestions(page, currentCategory, currentSearch);
      const questionsList = document.getElementById('questions-list');
      
      if (questions.length === 0) {
          questionsList.innerHTML = '<p>No questions found.</p>';
          return;
      }
      
      questionsList.innerHTML = questions
          .map(q => Components.questionCard(q))
          .join('');
  }
  
  async function applyFilters() {
      await loadQuestions(1);
  }
  
  async function navigateToQuestion(id) {
      currentPage = 'question';
      const mainContent = document.getElementById('main-content');
      const question = await api.getQuestion(id);
      const answers = question.answers || [];
      
      let html = `
          <div class="back-link">
              <button onclick="showHome()">← Back to Questions</button>
          </div>
          <div class="question-detail">
              <h1>${Components.escapeHtml(question.title)}</h1>
              <div class="card-meta">
                  <span class="category-badge">${question.category}</span>
                  <span>${question.author_name || 'Anonymous'}</span> • 
                  ${new Date(question.created_at).toLocaleDateString()}
              </div>
              <p>${Components.escapeHtml(question.content)}</p>
          </div>
          
          <div class="answers-section">
              <h2>${answers.length} ${answers.length === 1 ? 'Answer' : 'Answers'}</h2>
              <div id="answers-list">
                  ${answers.map(a => Components.answerItem(a)).join('')}
              </div>
          </div>
          
          ${Components.answerForm()}
      `;
      
      mainContent.innerHTML = html;
      
      // Answer form handler
      document.getElementById('answer-form').addEventListener('submit', async (e) => {
          e.preventDefault();
          const content = document.getElementById('a-content').value;
          const name = document.getElementById('a-name').value;
          
          try {
              await api.createAnswer(id, content, name);
              alert('Answer submitted! Reloading...');
              navigateToQuestion(id); // Reload
          } catch (err) {
              alert('Error submitting answer');
          }
      });
  }
  
  // Initialize on load
  document.addEventListener('DOMContentLoaded', init);

  async function showAskForm() {
      currentPage = 'ask';
      const mainContent = document.getElementById('main-content');
      
      mainContent.innerHTML = `
          <div class="back-link">
              <button onclick="showHome()">← Back</button>
          </div>
          ${Components.askQuestionForm(allCategories)}
      `;
      
      document.getElementById('ask-form').addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const title = document.getElementById('q-title').value;
          const category = document.getElementById('q-category').value;
          const content = document.getElementById('q-content').value;
          const name = document.getElementById('q-name').value;
          
          const submitBtn = document.getElementById('q-submit');
          submitBtn.disabled = true;
          submitBtn.textContent = 'Submitting...';
          
          try {
              const result = await api.createQuestion(title, content, category, name);
              
              if (result.id) {
                  alert('Question created! 🦆');
                  navigateToQuestion(result.id);
              } else {
                  alert('Error: ' + (result.error || 'Unknown error'));
              }
          } catch (err) {
              alert('Error submitting question');
              console.error(err);
          } finally {
              submitBtn.disabled = false;
              submitBtn.textContent = 'Submit Question';
          }
      });
  }