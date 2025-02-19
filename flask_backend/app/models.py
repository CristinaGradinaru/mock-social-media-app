import os, base64
from app import db, login
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
from flask_login import UserMixin

@login.user_loader
def load_user(user_id):
    return User.query.get(user_id)

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), nullable=False, unique=True)
    email = db.Column(db.String(150), nullable=False, unique=True)
    password = db.Column(db.String(256), nullable=False)
    post = db.relationship('Post', backref='author', lazy=True)
    comment = db.relationship('Comment', backref='author', lazy=True)
    token = db.Column(db.String(32), index=True, unique=True)
    token_expiration = db.Column(db.DateTime())

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = generate_password_hash(password)

    def __repr__(self):
        return f'<User: {self.username} | {self.email} | {self.password} | {self.id} | {self.token}>'

    def get_token(self,expires_in=3600):
        now = datetime.utcnow()
        if self.token and self.token_expiration > now + timedelta(seconds=60):
            return self.token
        self.token = base64.b64encode(os.urandom(24)).decode('utf-8')
        self.token_expiration = now + timedelta(seconds=expires_in)
        db.session.add(self)
        return self.token

    def revoke_token(self):
        self.token_expiration = datetime.utcnow() - timedelta(seconds=1)

    @staticmethod
    def check_token(token):
        user = User.query.filter_by(token=token).first()
        if user is None or user.token_expiration < datetime.utcnow():
            return None
        return user
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'password': self.password
        }


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200))
    image = db.Column(db.String(300))
    content = db.Column(db.String(300))
    upvote_count = db.Column(db.Integer)
    downvote_count = db.Column(db.Integer)
    date_created = db.Column(db.DateTime, nullable = False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    post_join = db.relationship('Post_Comment', backref='post_br')
    

    def __init__(self, title, image, content, user_id):
        self.title = title
        self.image = image,
        self.content = content
        self.user_id = user_id
        self.upvote_count = 0
        self.vote_count = 0
    
    def __repr__(self):
        return f'<Post: {self.title}>' #shows info in the post.query.all()
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'image': self.image,
            'content': self.content,
            "date_created": self.date_created,
            'user_id': self.user_id,
            'upvote_count': self.upvote_count,
            'downvote_count': self.downvote_count,
        }

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    comment_join = db.relationship('Post_Comment', backref='comment_br')
    content = db.Column(db.String(300))
    upvote_count = db.Column(db.Integer)
    downvote_count = db.Column(db.Integer)
    date_created = db.Column(db.DateTime, nullable = False, default=datetime.utcnow)
    def __init__(self, content, user_id, post_id):
        self.content = content
        self.user_id = user_id
        self.post_id = post_id
    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            "date_created": self.date_created,
            'user_id': self.user_id,
            'upvote_count': self.upvote_count,
            'downvote_count': self.downvote_count,
            'user': User.query.get(self.user_id).username
        }

class Post_Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey('comment.id'), nullable=False)
    def __init__(self, post_id, comment_id):
        self.post_id = post_id
        self.comment_id = comment_id
    def to_dict(self):
        return {
            'id': self.id,
            'post_id': self.post_id,
            'comment_id': self.comment_id
        }
    def __repr__(self):
        return f'<Post_Comment: {self.post_id} | {self.comment_id}>'
    