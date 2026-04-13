# TaxStorks 🦆

> A minimalist community platform for sharing and receiving tax advice.

## ✨ Features

- 🔐 Ask tax questions anonymously
- 💡 Share your tax knowledge with the community
- 📂 Browse questions by category
- 🎨 Clean, intuitive interface
- ⚡ Fast and lightweight

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Vanilla JS + HTML/CSS |
| **Backend** | Python Flask |
| **Database** | SQLite (upgradeable to PostgreSQL) |
| **Hosting** | GitHub Pages + Render.com |

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- pip
- Git

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python app.py
```

The backend will start on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
python -m http.server 8000
```

Open `http://localhost:8000` in your browser to view the application.

## 📁 Project Structure

```
taxstorks/
├── backend/          # Flask API server
│   ├── app.py
│   ├── requirements.txt
│   └── ...
├── frontend/         # Vanilla JS + HTML/CSS
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── ...
└── README.md
```

## 🔮 Future Enhancements

- [ ] User authentication & profiles
- [ ] Voting/rating system for answers
- [ ] Email notifications
- [ ] Advanced search & filtering
- [ ] Admin panel
- [ ] Categories & tags
- [ ] Markdown support

## 🤝 Contributing

Contributions are welcome. Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.