from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
import os
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=True)

    def __repr__(self):
        return f"Event('{self.name}', '{self.date}')"

class PageContent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    page_name = db.Column(db.String(100), unique=True, nullable=False)
    content = db.Column(db.Text, nullable=True)

    def __repr__(self):
        return f"PageContent('{self.page_name}')"

class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=False)
    url = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"Image('{self.filename}')"

@app.before_request
def create_tables():
    db.create_all()

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        if not os.path.exists(app.config['UPLOAD_FOLDER']):
            os.makedirs(app.config['UPLOAD_FOLDER'])
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        file_url = f"/uploads/{filename}"
        new_image = Image(filename=filename, url=file_url)
        db.session.add(new_image)
        db.session.commit()
        return jsonify({'message': 'File uploaded successfully', 'url': file_url, 'id': new_image.id}), 201
    return jsonify({'message': 'File type not allowed'}), 400

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/images', methods=['GET'])
def get_images():
    images = Image.query.all()
    output = []
    for image in images:
        output.append({'id': image.id, 'filename': image.filename, 'url': image.url})
    return jsonify({'images': output})

@app.route('/images/<int:image_id>', methods=['DELETE'])
def delete_image(image_id):
    image = Image.query.get_or_404(image_id)
    try:
        os.remove(os.path.join(app.config['UPLOAD_FOLDER'], image.filename))
        db.session.delete(image)
        db.session.commit()
        return jsonify({'message': 'Image deleted successfully!'})
    except Exception as e:
        return jsonify({'message': f'Error deleting image: {str(e)}'}), 500


@app.route('/content/<string:page_name>', methods=['GET'])
def get_page_content(page_name):
    content_entry = PageContent.query.filter_by(page_name=page_name).first()
    if content_entry:
        return jsonify({'page_name': content_entry.page_name, 'content': content_entry.content})
    return jsonify({'message': 'Content not found for this page.'}), 404

@app.route('/content', methods=['POST'])
def update_page_content():
    data = request.get_json()
    page_name = data.get('page_name')
    content = data.get('content')

    if not page_name:
        return jsonify({'message': 'Page name is required.'}), 400

    content_entry = PageContent.query.filter_by(page_name=page_name).first()
    if content_entry:
        content_entry.content = content
        db.session.commit()
        return jsonify({'message': 'Content updated successfully!'})
    else:
        new_content_entry = PageContent(page_name=page_name, content=content)
        db.session.add(new_content_entry)
        db.session.commit()
        return jsonify({'message': 'Content created successfully!'}), 201


@app.route('/events', methods=['POST'])
def add_event():
    data = request.get_json()
    new_event = Event(name=data['name'], date=data['date'], description=data.get('description'))
    db.session.add(new_event)
    db.session.commit()
    return jsonify({'message': 'Event added successfully!', 'id': new_event.id}), 201

@app.route('/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    output = []
    for event in events:
        output.append({'id': event.id, 'name': event.name, 'date': event.date, 'description': event.description})
    return jsonify({'events': output})

@app.route('/events/<int:event_id>', methods=['GET'])
def get_event(event_id):
    event = Event.query.get_or_404(event_id)
    return jsonify({'id': event.id, 'name': event.name, 'date': event.date, 'description': event.description})

@app.route('/events/<int:event_id>', methods=['PUT'])
def update_event(event_id):
    event = Event.query.get_or_404(event_id)
    data = request.get_json()
    event.name = data['name']
    event.date = data['date']
    event.description = data.get('description')
    db.session.commit()
    return jsonify({'message': 'Event updated successfully!'})

@app.route('/events/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    event = Event.query.get_or_404(event_id)
    db.session.delete(event)
    db.session.commit()
    return jsonify({'message': 'Event deleted successfully!'})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)