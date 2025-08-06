from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import os

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:3000"}})
app.config['SECRET_KEY'] = 'a_very_secret_key' # Replace with a real secret key
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# --- Database Models ---

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='user') # Roles: 'user', 'admin'
    profile = db.relationship('Profile', backref='user', uselist=False, cascade="all, delete-orphan")

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    full_name = db.Column(db.String(100))
    bio = db.Column(db.Text)

class NewsPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, server_default=db.func.now())
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    author = db.relationship('User', backref='news_posts')

class ForumPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, server_default=db.func.now())
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    author = db.relationship('User', backref='forum_posts')

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=True)

class Application(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)
    submitted_at = db.Column(db.DateTime, server_default=db.func.now())

class PageContent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    page_name = db.Column(db.String(100), unique=True, nullable=False) # e.g., 'about', 'history', 'sponsors'
    content = db.Column(db.Text, nullable=True)

# --- Helper Functions ---

def is_admin():
    user_id = session.get('user_id')
    if not user_id:
        return False
    user = User.query.get(user_id)
    return user and user.role == 'admin'

# --- Routes ---

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already exists'}), 409
    
    new_user = User(username=username)
    new_user.set_password(password)
    # Also create a default profile
    new_profile = Profile(user=new_user, full_name=username, bio='')
    db.session.add(new_user)
    db.session.add(new_profile)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        session['user_id'] = user.id
        session['role'] = user.role
        return jsonify({'message': 'Logged in successfully', 'user': {'id': user.id, 'username': user.username, 'role': user.role}}), 200
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/api/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    session.pop('role', None)
    return jsonify({'message': 'Logged out successfully'}), 200

@app.route('/api/status', methods=['GET'])
def status():
    user_id = session.get('user_id')
    if user_id:
        user = User.query.get(user_id)
        if user:
            return jsonify({'isLoggedIn': True, 'user': {'id': user.id, 'username': user.username, 'role': user.role}}), 200
    return jsonify({'isLoggedIn': False}), 200

@app.route('/api/profile', methods=['GET'])
def get_profile():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'message': 'Not logged in'}), 401
    
    user = User.query.get(user_id)
    if not user or not user.profile:
        return jsonify({'message': 'Profile not found'}), 404

    profile_data = {
        'username': user.username,
        'full_name': user.profile.full_name,
        'bio': user.profile.bio
    }
    return jsonify(profile_data), 200

# --- News Feed Routes ---

@app.route('/api/news', methods=['GET'])
def get_news():
    posts = NewsPost.query.order_by(NewsPost.timestamp.desc()).all()
    return jsonify([{'id': p.id, 'title': p.title, 'content': p.content, 'timestamp': p.timestamp, 'author': p.author.username} for p in posts]), 200

@app.route('/api/news', methods=['POST'])
def add_news_post():
    if not is_admin():
        return jsonify({'message': 'Admin access required'}), 403
    data = request.get_json()
    new_post = NewsPost(title=data['title'], content=data['content'], author_id=session['user_id'])
    db.session.add(new_post)
    db.session.commit()
    return jsonify({'message': 'News post created', 'id': new_post.id}), 201

# --- Forum Routes ---

@app.route('/api/forum', methods=['GET'])
def get_forum_posts():
    posts = ForumPost.query.order_by(ForumPost.timestamp.desc()).all()
    return jsonify([{'id': p.id, 'title': p.title, 'content': p.content, 'timestamp': p.timestamp, 'author': p.author.username} for p in posts]), 200

@app.route('/api/forum', methods=['POST'])
def add_forum_post():
    if 'user_id' not in session:
        return jsonify({'message': 'Authentication required'}), 401
    data = request.get_json()
    new_post = ForumPost(title=data['title'], content=data['content'], author_id=session['user_id'])
    db.session.add(new_post)
    db.session.commit()
    return jsonify({'message': 'Forum post created', 'id': new_post.id}), 201

# --- Static Page Content Routes ---

@app.route('/api/content/<page_name>', methods=['GET'])
def get_page_content(page_name):
    content_entry = PageContent.query.filter_by(page_name=page_name).first()
    if content_entry:
        return jsonify({'page_name': content_entry.page_name, 'content': content_entry.content})
    return jsonify({'message': 'Content not found'}), 404

@app.route('/api/content/<page_name>', methods=['POST'])
def update_page_content(page_name):
    if not is_admin():
        return jsonify({'message': 'Admin access required'}), 403
    data = request.get_json()
    content_entry = PageContent.query.filter_by(page_name=page_name).first()
    if content_entry:
        content_entry.content = data.get('content')
    else:
        content_entry = PageContent(page_name=page_name, content=data.get('content'))
        db.session.add(content_entry)
    db.session.commit()
    return jsonify({'message': 'Content updated successfully'}), 200

# --- Application Form Routes ---

@app.route('/api/application', methods=['POST'])
def submit_application():
    data = request.get_json()
    new_app = Application(name=data['name'], email=data['email'], message=data['message'])
    db.session.add(new_app)
    db.session.commit()
    return jsonify({'message': 'Application submitted successfully'}), 201

@app.route('/api/applications', methods=['GET'])
def get_applications():
    if not is_admin():
        return jsonify({'message': 'Admin access required'}), 403
    apps = Application.query.all()
    return jsonify([{'id': a.id, 'name': a.name, 'email': a.email, 'message': a.message, 'submitted_at': a.submitted_at} for a in apps]), 200

# --- Event Routes (Admin Only) ---

@app.route('/api/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    return jsonify([{'id': e.id, 'name': e.name, 'date': e.date, 'description': e.description} for e in events]), 200

@app.route('/api/events', methods=['POST'])
def add_event():
    if not is_admin():
        return jsonify({'message': 'Admin access required'}), 403
    data = request.get_json()
    new_event = Event(name=data['name'], date=data['date'], description=data.get('description'))
    db.session.add(new_event)
    db.session.commit()
    return jsonify({'message': 'Event added', 'id': new_event.id}), 201

@app.route('/api/events/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    if not is_admin():
        return jsonify({'message': 'Admin access required'}), 403
    event = Event.query.get_or_404(event_id)
    db.session.delete(event)
    db.session.commit()
    return jsonify({'message': 'Event deleted'}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        # Create an admin user if one doesn't exist
        if not User.query.filter_by(username='admin').first():
            admin_user = User(username='admin', role='admin')
            admin_user.set_password('admin') # Default password, should be changed
            db.session.add(admin_user)
            db.session.commit()
    app.run(debug=True, port=5000)