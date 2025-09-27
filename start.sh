#!/bin/bash

# Netflix Clone - Startup Script
# This script automates the startup process for the Netflix clone application
# It installs dependencies and starts both frontend and backend servers
#
# Usage: ./start.sh
# Author: Rohit Kulkarni
# Version: 1.0.0

# Colors for output formatting
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check Node.js version
check_node_version() {
    if command_exists node; then
        NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
        if [ "$NODE_VERSION" -lt 14 ]; then
            print_error "Node.js version 14 or higher is required. Current version: $(node --version)"
            exit 1
        fi
        print_success "Node.js version check passed: $(node --version)"
    else
        print_error "Node.js is not installed. Please install Node.js 14 or higher."
        exit 1
    fi
}

# Function to check npm version
check_npm_version() {
    if command_exists npm; then
        NPM_VERSION=$(npm --version | cut -d'.' -f1)
        if [ "$NPM_VERSION" -lt 6 ]; then
            print_warning "npm version 6 or higher is recommended. Current version: $(npm --version)"
        fi
        print_success "npm version check passed: $(npm --version)"
    else
        print_error "npm is not installed. Please install npm 6 or higher."
        exit 1
    fi
}

# Function to install dependencies
install_dependencies() {
    print_status "Installing root dependencies..."
    if npm install; then
        print_success "Root dependencies installed successfully"
    else
        print_error "Failed to install root dependencies"
        exit 1
    fi

    print_status "Installing frontend dependencies..."
    if cd frontend && npm install; then
        print_success "Frontend dependencies installed successfully"
        cd ..
    else
        print_error "Failed to install frontend dependencies"
        exit 1
    fi

    print_status "Installing backend dependencies..."
    if cd backend && npm install; then
        print_success "Backend dependencies installed successfully"
        cd ..
    else
        print_error "Failed to install backend dependencies"
        exit 1
    fi
}

# Function to start the application
start_application() {
    print_status "Starting Netflix Clone application..."
    print_status "Backend will run on: http://localhost:5000"
    print_status "Frontend will run on: http://localhost:3000"
    print_status "Press Ctrl+C to stop the application"
    
    # Start backend in background
    print_status "Starting backend server..."
    cd backend && npm start &
    BACKEND_PID=$!
    
    # Wait a moment for backend to start
    sleep 3
    
    # Start frontend
    print_status "Starting frontend server..."
    cd ../frontend && npm start &
    FRONTEND_PID=$!
    
    # Function to handle cleanup on exit
    cleanup() {
        print_status "Shutting down application..."
        kill $BACKEND_PID 2>/dev/null
        kill $FRONTEND_PID 2>/dev/null
        print_success "Application stopped"
        exit 0
    }
    
    # Set up signal handlers
    trap cleanup SIGINT SIGTERM
    
    # Wait for processes
    wait
}

# Main execution
main() {
    echo -e "${BLUE}"
    echo "=========================================="
    echo "    Netflix Clone - Startup Script"
    echo "=========================================="
    echo -e "${NC}"
    
    # Check prerequisites
    print_status "Checking prerequisites..."
    check_node_version
    check_npm_version
    
    # Install dependencies
    print_status "Installing dependencies..."
    install_dependencies
    
    # Start application
    start_application
}

# Run main function
main "$@"