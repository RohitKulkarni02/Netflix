# Netflix Clone

A full-stack Netflix clone built with React and Node.js, featuring user authentication, movie browsing, and streaming capabilities.

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **Movie Browsing**: Browse movies by categories and genres
- **Search Functionality**: Find movies and TV shows quickly
- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern UI**: Netflix-inspired interface with smooth animations
- **Backend API**: RESTful API for data management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** for version control
- **MongoDB** (local installation or MongoDB Atlas account)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/RohitKulkarni02/Netflix.git
cd Netflix
```

### 2. Install Dependencies

Install dependencies for both frontend and backend:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Configuration

#### Backend Environment Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Copy the environment example file:
   ```bash
   cp .env.example .env
   ```

3. Update the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/netflix-clone
   JWT_SECRET=your_jwt_secret_here
   JWT_EXPIRE=7d
   TMDB_API_KEY=your_tmdb_api_key_here
   ```

#### Frontend Environment Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_TMDB_IMAGE_URL=https://image.tmdb.org/t/p/original
   ```

### 4. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service:
   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community
   
   # On Ubuntu/Debian
   sudo systemctl start mongod
   
   # On Windows
   net start MongoDB
   ```

#### Option B: MongoDB Atlas (Recommended)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string and update the `MONGODB_URI` in your `.env` file

### 5. API Keys Setup

1. **TMDB API Key** (for movie data):
   - Visit [The Movie Database (TMDB)](https://www.themoviedb.org/settings/api)
   - Create an account and request an API key
   - Add the API key to your backend `.env` file

## 🚀 Running the Application

### Development Mode

#### Option 1: Using the Start Script (Recommended)
```bash
# Make the start script executable
chmod +x start.sh

# Run the application
./start.sh
```

#### Option 2: Manual Setup

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend Development Server:**
```bash
cd frontend
npm start
```

### Production Mode

```bash
# Build the frontend
cd frontend
npm run build

# Start the production server
cd ../backend
npm start
```

## 📁 Project Structure

```
Netflix/
├── backend/                 # Node.js/Express backend
│   ├── config/             # Database and app configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── utils/             # Utility functions
│   ├── .env.example       # Environment variables template
│   └── package.json       # Backend dependencies
├── frontend/               # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   └── index.css      # Global styles
│   ├── index.html         # HTML template
│   └── README.md          # Frontend-specific docs
├── .env.sample            # Root environment template
├── package.json          # Root dependencies
├── server.js             # Main server file
├── start.sh              # Application startup script
└── README.md             # This file
```

## 🔧 Available Scripts

### Root Level
- `npm install` - Install all dependencies
- `npm start` - Start the application

### Backend Scripts
- `npm run dev` - Start backend in development mode
- `npm start` - Start backend in production mode
- `npm test` - Run backend tests

### Frontend Scripts
- `npm start` - Start frontend development server
- `npm run build` - Build for production
- `npm test` - Run frontend tests

## 🌐 API Endpoints

The backend provides the following main API endpoints:

- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie by ID
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill process using port 3000 or 5000
   lsof -ti:3000 | xargs kill -9
   lsof -ti:5000 | xargs kill -9
   ```

2. **MongoDB Connection Issues**
   - Ensure MongoDB is running
   - Check your connection string in `.env`
   - Verify network connectivity for Atlas

3. **Environment Variables Not Loading**
   - Ensure `.env` files are in the correct directories
   - Restart your development servers after changing environment variables

4. **Dependencies Issues**
   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed
- Ensure all environment variables are properly configured

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/RohitKulkarni02/Netflix/issues) page
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for movie data
- [React](https://reactjs.org/) for the frontend framework
- [Node.js](https://nodejs.org/) for the backend runtime
- [MongoDB](https://www.mongodb.com/) for the database