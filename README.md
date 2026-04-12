# Persona 3 Website Project

A stylish Persona 3 inspired website built with **Laravel 11**, **React**, and **Tailwind CSS**.

## 🚀 Getting Started

### 1. Installation
First, clone the project and install the dependencies:
```bash
composer install
npm install
```

### 2. Environment Setup
Create your environment file and generate the application key:
```bash
cp .env.example .env
php artisan key:generate
```

### 3. Database
This project uses SQLite by default. Run the migrations to set up the database:
```bash
php artisan migrate
```

### 4. Assets (Crucial)
GitHub has a file size limit, so the background videos are not included in this repository.
1. Download the videos from this [Google Drive Link](https://drive.google.com/drive/folders/1_dVxHVTJO_YtMAo9ia7wnja1XY0nImr5?usp=sharing).
2. Place the video files into the `resources/js/assets/` directory.

### 5. Running the Project
To run the server and the frontend compiler simultaneously:
```bash
composer run dev
```
Alternatively, you can run them in separate terminals:
- **Backend**: `php artisan serve`
- **Frontend**: `npm run dev`

---
## ✨ Follow Me
Drop a follow on my Instagram: **[moneybagg.py](https://www.instagram.com/moneybagg.py)**
Follow me here on GitHub for more cool content! 🚀
