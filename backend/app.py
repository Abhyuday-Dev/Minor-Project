from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://abhyuday7176:1234@ac-fqjt3ib-shard-00-00.nbjh7ib.mongodb.net:27017,ac-fqjt3ib-shard-00-01.nbjh7ib.mongodb.net:27017,ac-fqjt3ib-shard-00-02.nbjh7ib.mongodb.net:27017/?ssl=true&replicaSet=atlas-af6yud-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'
app.config['JWT_SECRET_KEY'] = 'testing'
mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

CORS(app)

class User:
    @staticmethod
    def find_by_username(username):
        try:
            user = mongo.db.users.find_one({'username': username})
            return user
        except Exception as e:
            print(f"Error finding user by username: {e}")
            return None

@app.route('/')
def index():
    return "Server is running!"

@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.json
        
        name = data.get('name')
        username = data.get('username')
        password = bcrypt.generate_password_hash(data.get('password')).decode('utf-8')

        existing_user = User.find_by_username(username)
        if existing_user:
            return jsonify({'message': 'User already exists'}), 400

        print("new user name -> name", name)
        mongo.db.users.insert_one({'name': name, 'username': username, 'password': password})
        access_token = create_access_token(identity=username)
        return jsonify({'message': 'User created successfully', 'access_token': access_token}), 201
    except Exception as e:
        return jsonify({'message': 'Failed to create user', 'error': str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')

        user = User.find_by_username(username)
        if not user or not bcrypt.check_password_hash(user['password'], password):
            return jsonify({'message': 'Invalid username or password'}), 401

        access_token = create_access_token(identity=user['_id'])  # Using user ID as identity
        return jsonify({'access_token': access_token}), 200
    except Exception as e:
        return jsonify({'message': 'Login failed', 'error': str(e)}), 500

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    try:
        current_user = get_jwt_identity()
        return jsonify(logged_in_as=current_user), 200
    except Exception as e:
        return jsonify({'message': 'Protected route failed', 'error': str(e)}), 500

if __name__ == '__main__':
    try:
        # Initialize MongoDB connection
        mongo.init_app(app)
        # Verify the connection
        if mongo.db:
            print("Connected to MongoDB successfully")
            # Run the Flask app
            app.run(debug=True)
        else:
            print("Failed to connect to MongoDB")
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")

