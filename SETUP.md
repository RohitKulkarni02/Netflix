# Netflix Clone - Setup Guide

## 🚨 Server Startup Issues - RESOLVED

This guide will help you resolve the server startup crashes and get your Netflix clone running properly.

## ✅ Issues Fixed

1. **Missing package.json** - Added with all necessary dependencies
2. **Missing environment configuration** - Created .env file with proper settings
3. **Missing error handling** - Added comprehensive error middleware
4. **Missing main entry point** - Created server.js with proper startup logic
5. **Missing startup script** - Added start.sh for easy server launch

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB (local or cloud)

### Installation

1. **Clone and navigate to the repository:**
   ```bash
   git clone <your-repo-url>
   cd Netflix
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   # Copy the sample environment file
   cp .env.sample .env
   
   # Edit .env file with your configuration
   nano .env
   ```

4. **Start the server:**
   ```bash
   # Option 1: Use the startup script
   chmod +x start.sh
   ./start.sh
   
   # Option 2: Use npm scripts
   npm start        # Production
   npm run dev      # Development with nodemon
   ```

## 🔧 Configuration

### Environment Variables

Update the `.env` file with your configuration:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/netflix-clone

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# TMDB API Configuration
TMDB_API_KEY=your-tmdb-api-key-here
TMDB_BASE_URL=https://api.themoviedb.org/3

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### Required API Keys

1. **TMDB API Key**: Get your free API key from [The Movie Database](https://www.themoviedb.org/settings/api)
2. **MongoDB**: Set up a local MongoDB instance or use MongoDB Atlas

## 🏥 Health Check

Once the server is running, you can check if it's working:

- **Health endpoint**: `http://localhost:5000/health`
- **API base**: `http://localhost:5000/api`

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Kill process using port 5000
   lsof -ti:5000 | xargs kill -9
   ```

2. **MongoDB connection failed:**
   - Ensure MongoDB is running
   - Check your MONGODB_URI in .env
   - For local MongoDB: `mongod`

3. **Missing dependencies:**
   ```bash
   npm install
   ```

4. **Permission denied on start.sh:**
   ```bash
   chmod +x start.sh
   ```

### Logs and Debugging

- Check console output for error messages
- Use `npm run dev` for development with auto-restart
- Check MongoDB connection logs
- Verify all environment variables are set

## 📁 Project Structure

```
Netflix/
├── server.js                 # Main server entry point
├── package.json             # Dependencies and scripts
├── .env                     # Environment configuration
├── start.sh                 # Startup script
├── backend/
│   ├── config/
│   │   ├── server.js        # Server configuration
│   │   ├── db.js           # Database connection
│   │   └── envVars.js      # Environment variables
│   ├── controllers/         # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   └── services/          # External services
└── frontend/              # React frontend
```

## 🚀 Production Deployment

For production deployment:

1. Set `NODE_ENV=production` in .env
2. Use a production MongoDB instance
3. Set secure JWT secrets
4. Configure proper CORS origins
5. Use a process manager like PM2

```bash
# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start server.js --name "netflix-clone"
```

## 📞 Support

If you're still experiencing issues:

1. Check the console logs for specific error messages
2. Verify all environment variables are correctly set
3. Ensure MongoDB is running and accessible
4. Check that all required ports are available

The server should now start successfully without crashes! 🎉