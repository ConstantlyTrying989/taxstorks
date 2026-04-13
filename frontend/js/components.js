class Components {
      static questionCard(question) {
          const answerWord = question.answer_count === 1 ? 'answer' : 'answers';
          return `
              <div class="card question-card" data-question-id="${question.id}">
                  <h3 class="card-title" onclick="navigateToQuestion(${question.id})">${this.escapeHtml(question.title)}</h3>
                  <div class="card-meta">
                      <span class="category-badge">${question.category}</span>
                      <span>${question.author_name || 'Anonymous'}</span> • 
                      <span>${new Date(question.created_at).toLocaleDateString()}</span> • 
                      <span>${question.answer_count} ${answerWord}</span>
                  </div>
              </div>
          `;
      }
  
      static answerItem(answer) {
          return `
              <div class="card answer-card">
                  <p>${this.escapeHtml(answer.content)}</p>
                  <div class="card-meta">
                      <strong>${answer.author_name || 'Anonymous'}</strong> • 
                      ${new Date(answer.created_at).toLocaleDateString()}
                  </div>
              </div>
          `;
      }
  
      static askQuestionForm(categories) {
          return `
              <div class="form-container">
                  <h2>Ask a Question</h2>
                  <form id="ask-form">
                      <div class="form-group">
                          <label for="q-title">Question Title</label>
                          <input type="text" id="q-title" required placeholder="What's your tax question?">
                      </div>
                      <div class="form-group">
                          <label for="q-category">Category</label>
                          <select id="q-category" required>
                              <option value="">Select a category</option>
                              ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                          </select>
                      </div>
                      <div class="form-group">
                          <label for="q-content">Details</label>
                          <textarea id="q-content" required placeholder="Provide more details..."></textarea>
                      </div>
                      <div class="form-group">
                          <label for="q-name">Name (Optional)</label>
                          <input type="text" id="q-name" placeholder="Anonymous">
                      </div>
                      <button type="submit" id="q-submit">Submit Question</button>
                  </form>
              </div>
          `;
      }
  
      static answerForm() {
          return `
              <div class="form-container">
                  <h3>Add Your Answer</h3>
                  <form id="answer-form">
                      <div class="form-group">
                          <label for="a-content">Your Answer</label>
                          <textarea id="a-content" required placeholder="Share your tax wisdom..."></textarea>
                      </div>
                      <div class="form-group">
                          <label for="a-name">Name (Optional)</label>
                          <input type="text" id="a-name" placeholder="Anonymous">
                      </div>
                      <button type="submit" id="a-submit">Submit Answer</button>
                  </form>
              </div>
          `;
      }
  
      static escapeHtml(unsafe) {
          return unsafe
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
      }
  }