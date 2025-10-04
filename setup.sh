#!/bin/bash

# ARCO Project Setup Script
# This script helps you quickly set up the development environment

echo "🚀 ARCO Development Environment Setup"
echo "====================================="

# Function to activate API environment
activate_api() {
    echo "📡 Activating API environment..."
    cd api && source venv/bin/activate
    echo "✅ API environment activated! You can now run: uvicorn main:app --reload"
}

# Function to activate Intelligence environment  
activate_intelligence() {
    echo "🧠 Activating Intelligence environment..."
    cd intelligence && source venv/bin/activate
    echo "✅ Intelligence environment activated!"
}

# Function to start Next.js development server
start_web() {
    echo "🌐 Starting Next.js development server..."
    pnpm dev
}

# Function to run tests
run_tests() {
    echo "🧪 Running tests..."
    pnpm test
}

# Show available commands
show_help() {
    echo "Available commands:"
    echo "  ./setup.sh api         - Activate API Python environment"
    echo "  ./setup.sh intelligence - Activate Intelligence Python environment"  
    echo "  ./setup.sh web         - Start Next.js development server"
    echo "  ./setup.sh test        - Run tests"
    echo "  ./setup.sh help        - Show this help"
}

# Parse command line arguments
case "$1" in
    "api")
        activate_api
        ;;
    "intelligence")
        activate_intelligence
        ;;
    "web")
        start_web
        ;;
    "test")
        run_tests
        ;;
    "help"|"")
        show_help
        ;;
    *)
        echo "❌ Unknown command: $1"
        show_help
        exit 1
        ;;
esac