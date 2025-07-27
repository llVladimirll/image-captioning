
# 📸 Image Captioning App

## Overview
A full-stack web application that generates descriptive captions for uploaded images.  

- **Backend**: Flask-based API using BLIP model for captioning  
- **Frontend**: Next.js (React) interface for uploading images & displaying results  

---

## 🚀 Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Backend Setup](#backend-setup)  
  - [Frontend Setup](#frontend-setup)  
- [Usage](#usage)  
- [Project Structure](#project-structure)  
- [Model & Inference](#model--inference)  
- [Screenshots / Demo](#screenshots--demo)  
- [Future Improvements](#future-improvements)  
- [License](#license)  
- [Contributing](#contributing)  

---

## ✨ Features

- Upload images via a web interface
- Flask API processes the image using BLIP from HuggingFace
- Model generates natural-language captions
- Captions shown instantly in the Next.js frontend

---

## 🧰 Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | Next.js (React)                     |
| Backend    | Flask                               |
| ML Model   | Salesforce BLIP (BLIP-base)         |
| API Comm.  | RESTful (Axios / fetch)             |
| CORS       | Flask-CORS                          |

---

## 🏁 Getting Started

### Prerequisites

- Node.js & npm or yarn  
- Python 3.8+  
- Virtual environment (venv, conda, etc.)  

---

### Backend Setup

```bash
cd backend/
python -m venv venv
source venv/bin/activate     # or .\venv\Scripts\activate on Windows
pip install -r requirements.txt
```

Your `requirements.txt` should contain:

```
flask
flask-cors
transformers
torch
pillow
```

Run the Flask API:

```bash
python app.py
```

Default address: `http://localhost:5000`

---

### Frontend Setup

```bash
cd frontend/
npm install
npm run dev      # or yarn dev
```

Frontend should be accessible at: `http://localhost:3000`

---

## 🧪 Usage

1. Open the frontend in your browser  
2. Choose an image file and upload it  
3. The backend generates a caption via the BLIP model  
4. Caption is displayed next to your image  

---

## 📁 Project Structure

### Backend

```
backend/
├── app.py                # Flask API using BLIP
├── requirements.txt
```

### Frontend

```
frontend/
├── pages/
│   └── index.tsx         # Main upload UI
├── components/
│   └── ImageUploader.tsx
├── public/
│   └── ...
```

---

## 🧠 Model & Inference

- The backend uses the `Salesforce/blip-image-captioning-base` model via HuggingFace Transformers.
- An image is uploaded to the Flask endpoint `/caption`.
- The model processes the image and returns a generated natural language caption.
- The model uses GPU (if available), otherwise falls back to CPU.

Example API usage:
```bash
curl -X POST -F "image=@your_image.jpg" http://localhost:5000/caption
```

Sample JSON response:
```json
{
  "caption": "a cat sitting on a wooden table"
}
```

---

## 📸 Screenshots / Demo

> Add screenshots in `frontend/public/screenshots` and link them here:

```md
![Upload Page](./frontend/public/screenshots/upload.png)
![Caption Output](./frontend/public/screenshots/result.png)
```

---

## 🛠️ Future Improvements

- [ ] Drag-and-drop UI
- [ ] Multi-caption support
- [ ] Deploy with Docker or on platforms like Heroku/Vercel
- [ ] Switch to BLIP-2 or other state-of-the-art vision-language models

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

1. Fork the repository  
2. Create your feature branch (`git checkout -b feature/foo`)  
3. Commit your changes  
4. Push to the branch (`git push origin feature/foo`)  
5. Open a pull request  

---
