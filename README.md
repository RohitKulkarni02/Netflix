# Netflix Clone

A full-stack Netflix clone built with React and Node.js, featuring user authentication, movie browsing, and streaming capabilities.

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **Movie Browsing**: Browse movies by categories and genres
- **Search Functionality**: Search for movies and TV shows
- **User Profiles**: Multiple user profiles support
- **Responsive Design**: Mobile-friendly interface
- **Video Streaming**: Integrated video player
- **Admin Dashboard**: Content management system

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **CSS3** - Styling
- **JavaScript (ES6+)** - Programming language

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Multer** - File upload handling

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (v4.4 or higher)
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/RohitKulkarni02/Netflix.git
cd Netflix
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 3. Environment Setup

1. Copy the environment sample file:
```bash
cp .env.sample .env
```

2. Update the `.env` file with your configuration:
```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/netflix-clone

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend Configuration
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Database Setup

1. Start MongoDB service:
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Ubuntu/Debian
sudo systemctl start mongod

# On Windows
net start MongoDB
```

2. Create the database (optional - will be created automatically):
```bash
mongo
use netflix-clone
```

### 5. Run the Application

#### Option 1: Using the Start Script
```bash
# Make the script executable
chmod +x start.sh

# Run the application
./start.sh
```

#### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api-docs

## 📁 Project Structure

```
Netflix/
├── backend/                 # Backend API
│   ├── config/             # Database and app configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   └── utils/             # Utility functions
├── frontend/               # React frontend
│   ├── public/            # Static assets
│   └── src/
│       ├── components/     # Reusable components
│       ├── pages/         # Page components
│       ├── hooks/         # Custom React hooks
│       └── styles/        # CSS files
├── .env                   # Environment variables
├── .env.sample           # Environment template
├── package.json          # Root package.json
├── server.js            # Main server file
└── start.sh             # Startup script
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/netflix-clone` |
| `JWT_SECRET` | Secret key for JWT tokens | Required |
| `JWT_EXPIRE` | JWT token expiration time | `7d` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `REACT_APP_API_URL` | Frontend API URL | `http://localhost:5000/api` |

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie by ID
- `POST /api/movies` - Create movie (Admin)
- `PUT /api/movies/:id` - Update movie (Admin)
- `DELETE /api/movies/:id` - Delete movie (Admin)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id/movies` - Get movies by category

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

## 🚀 Deployment

See [deployment.md](deployment.md) for detailed deployment instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rohit Kulkarni**
- GitHub: [@RohitKulkarni02](https://github.com/RohitKulkarni02)

## 🙏 Acknowledgments

- Netflix for the design inspiration
- The open-source community for the amazing tools and libraries
- All contributors who helped make this project better

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/RohitKulkarni02/Netflix/issues) page
2. Create a new issue if your problem isn't already reported
3. Contact the maintainer

---

⭐ Star this repository if you found it helpful!