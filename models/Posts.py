from app import database

class Posts(database.Model):
    id = database.Column(database.Integer, primary_key=True)
    title = database.Column(database.String(200), nullable=False)
    content = database.Column(database.String(1000), nullable=False)
    username = database.Column(database.String(80), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "username": self.username
        }
