
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
- [License](#license)  

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

├── app/                    # App directory (Next.js 13+)
│   ├── layout.tsx         # Global layout wrapper
│   ├── page.tsx           # Main UI page (image upload & result)
│   └── favicon.ico        # Favicon
│
├── components/            # Shared and reusable UI components
│   └── ui/                # Shadcn-like UI primitives
│       ├── alert.tsx
│       ├── button.tsx
│       └── card.tsx
│
├── lib/                   # Utility functions
│   └── utils.ts
│
├── public/                # Public static files
│   └── screenshots/       # (Optional) screenshots to display in README
│
├── styles/ or globals     # Global CSS
│   └── globals.css
│
├── next.config.ts         # Next.js config
├── tsconfig.json          # TypeScript config
├── package.json           # Dependencies & scripts
├── postcss.config.mjs     # PostCSS configuration
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


## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

