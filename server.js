/**
 * Netflix Clone - Main Server File
 * 
 * This is the main entry point for the Netflix clone backend server.
 * It sets up the Express server, middleware, routes, and database connection.
 * 
 * @author Rohit Kulkarni
 * @version 1.0.0
 */

// Import required dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Create Express application instance
const app = express();

// Get port from environment variables or use default
const PORT = process.env.PORT || 5000;

// Middleware configuration
// Enable CORS for cross-origin requests
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

// Parse JSON bodies for API requests
app.use(express.json({ limit: '10mb' }));

// Parse URL-encoded bodies for form submissions
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Database connection
const connectDB = async () => {
    try {
        // Connect to MongoDB using the URI from environment variables
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/netflix-clone', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('❌ Database connection error:', error.message);
        process.exit(1); // Exit process with failure
    }
};

// API Routes
// Authentication routes
app.use('/api/auth', require('./backend/routes/auth'));

// Movie routes
app.use('/api/movies', require('./backend/routes/movies'));

// Category routes
app.use('/api/categories', require('./backend/routes/categories'));

// User routes
app.use('/api/users', require('./backend/routes/users'));

// Admin routes
app.use('/api/admin', require('./backend/routes/admin'));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Netflix Clone API is running',
        timestamp: new Date().toISOString()
    });
});

// Serve React app for all non-API routes (SPA routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('🚨 Error:', err.stack);
    
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Start server function
const startServer = async () => {
    try {
        // Connect to database first
        await connectDB();
        
        // Start the server
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📱 Frontend: http://localhost:3000`);
            console.log(`🔧 API: http://localhost:${PORT}/api`);
            console.log(`🏥 Health: http://localhost:${PORT}/api/health`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
};

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('🚨 Uncaught Exception:', err);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('🚨 Unhandled Rejection:', err);
    process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 SIGINT received, shutting down gracefully');
    process.exit(0);
});

// Start the server
startServer();