# Development Workflow Guide

## Quick Start Commands

### Frontend Development
```bash
cd frontend
npm install          # Install dependencies (first time only)
npm start            # Start development server (http://localhost:3000)
npm run build        # Build for production
```

### Backend Development  
```bash
cd backend
python -m venv .venv                    # Create virtual environment (first time)
.venv\Scripts\activate                  # Activate virtual environment (Windows)
pip install -r requirements.txt        # Install dependencies
python app.py                          # Start Flask server (http://localhost:5000)
```

## Recommended Development Workflow

### 1. Feature Development
- **Plan**: Analyze current code with Claude
- **Generate**: Use Gemini CLI for new components/features
- **Integrate**: Use Claude for file operations and integration
- **Test**: Run both frontend and backend locally
- **Deploy**: Commit and push with Claude

### 2. Daily Workflow
```bash
# Start development servers
cd frontend && npm start        # Terminal 1
cd backend && python app.py     # Terminal 2

# Make changes
# Test changes
# Commit with Claude when ready
```

### 3. Git Workflow
- Use Claude for all Git operations
- Commit frequently with descriptive messages
- Push to GitHub regularly

## Development Tools Integration

### VS Code (Recommended)
- Install React and Python extensions
- Use integrated terminal for commands
- Git integration for visual diffs

### Browser Dev Tools
- React Developer Tools extension
- Network tab for API debugging
- Console for JavaScript debugging

## Next Development Priorities

1. **Backend Enhancement**
   - Add database integration (SQLite/PostgreSQL)
   - Create API endpoints for events
   - Add user authentication

2. **Frontend Improvements**
   - Add routing with React Router
   - Create event listing/detail pages
   - Add responsive design improvements

3. **Integration**
   - Connect frontend to backend APIs
   - Add state management (Context/Redux)
   - Implement real-time features
