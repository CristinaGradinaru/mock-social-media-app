from app import create_app, db
from app.models import User, Post, Comment, Post_Comment

app=create_app()

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'Post': Post, 'Comment':Comment, 'Post_Comment': Post_Comment}