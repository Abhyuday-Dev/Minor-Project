# models.py

from flask_pymongo import PyMongo

mongo = PyMongo()

class User:
    def __init__(self, name, username, password):
        self.name = name
        self.username = username
        self.password = password

    def save(self):
        try:
            print('saving')
            mongo.db['users'].insert_one({'name': self.name, 'username': self.username, 'password': self.password})
        except Exception as e:
            raise Exception(f"Failed to save user: {str(e)}")

    @staticmethod
    def find_by_username(username):
        return mongo.db.users.find_one({'username': username})