# Jiva Bookshelf

A modern and responsive bookshelf application built with React and Tailwind CSS. This project allows users to manage their book collection with a beautiful and intuitive interface.

## 🚀 Features

- Modern and responsive design
- Built with React and Tailwind CSS
- Clean and maintainable code structure
- SQLite database for easy setup and portability
- Book management functionality
- Docker support for easy deployment and development

## 📋 Prerequisites

Before you begin, ensure you have one of the following setups:

### Option 1: Docker Setup (Recommended)

- Docker
- Docker Compose

### Option 2: Local Development Setup

#### Frontend Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)

### Backend Requirements

- Python (v3.8 or higher)
- pip (Python package manager)

### Python Packages

```bash
pip install fastapi
pip install uvicorn
pip install sqlalchemy
pip install python-dotenv
pip install aiosqlite
```

## 🛠️ Installation

You can run this application either using Docker (recommended) or traditional local setup.

### Using Docker (Recommended)

1. Clone the repository:

```bash
git clone [your-repository-url]
```

2. Navigate to the project directory:

```bash
cd jiva-bookshelf
```

3. Build and run with Docker Compose:

```bash
docker-compose up --build
```

The application will be available at [http://localhost:3000](http://localhost:3000), and the API at [http://localhost:8000](http://localhost:8000).

### Traditional Local Setup

1. Clone the repository:

```bash
git clone [your-repository-url]
```

2. Navigate to the project directory:

```bash
cd jiva-bookshelf
```

3. Install frontend dependencies:

```bash
npm install
```

4. Set up the backend:

```bash
cd backend
pip install -r requirements.txt
```

## 🏃‍♂️ Running the Application

### Using Docker (Recommended)

```bash
docker-compose up
```

To run in detached mode:

```bash
docker-compose up -d
```

To stop the containers:

```bash
docker-compose down
```

### Traditional Local Setup

1. Start the backend server:

```bash
cd backend
uvicorn main:app --reload
```

2. In a new terminal, start the frontend development server:

```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000), and the API will be running at [http://localhost:8000](http://localhost:8000).

## 🏗️ Building for Production

To create a production build:

```bash
npm run build
```

The build files will be created in the `build` directory.

## 🧰 Tech Stack

- React
- Tailwind CSS
- FastAPI (Backend)
- SQLite (Database)
- SQLAlchemy (ORM)
- Docker & Docker Compose

## 📝 Project Structure

```
jiva-bookshelf/
├── backend/           # FastAPI backend server files
│   ├── database/     # Database models and configuration
│   ├── routers/     # API route handlers
│   └── main.py      # Main application file
├── public/           # Public assets
├── src/              # Source files
│   ├── components/   # React components
│   ├── pages/       # Page components
│   └── styles/      # CSS styles
└── ...
```

## 💡 Why SQLite?

We chose SQLite as our database solution for several reasons:

- Simplified setup and deployment process
- No need for separate database server installation
- Perfect for small to medium-sized applications
- Self-contained and portable database file
- Zero-configuration required
- Reliable and widely used in production environments

## 🐳 Docker Configuration

The application is containerized using Docker, providing several benefits:

- One-command setup and deployment
- Consistent development environment across different machines
- No need to install dependencies locally (except Docker)
- Isolated environment for the application
- Easy to scale and deploy
- Works the same way on any operating system

The Docker setup includes:

- Frontend container running React
- Backend container running FastAPI
- Automatic hot-reloading for both frontend and backend during development

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👥 Authors

- Fabian Birli - Initial work

## 🙏 Acknowledgments

- Create React App for the initial project setup
- Tailwind CSS for the styling framework
- FastAPI for the powerful backend framework
- SQLite for the efficient database solution
