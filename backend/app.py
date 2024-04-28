from flask import Flask, request, jsonify, render_template
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from models import User, mongo
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['MONGO_URI'] = 'mongodb://abhyuday7176:1234@ac-fqjt3ib-shard-00-00.nbjh7ib.mongodb.net:27017,ac-fqjt3ib-shard-00-01.nbjh7ib.mongodb.net:27017,ac-fqjt3ib-shard-00-02.nbjh7ib.mongodb.net:27017/?ssl=true&replicaSet=atlas-af6yud-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'
app.config['JWT_SECRET_KEY'] = 'hjijoh'

mongo.init_app(app)

bcrypt = Bcrypt(app)
jwt = JWTManager(app)

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

        print(data)

        # existing_user = User.find_by_username(username)
        # if existing_user:
        #     return jsonify({'message': 'User already exists'}), 400

        mongo.db['users'].insert_one(data)
        print("user saved")
        access_token = create_access_token(identity=username)
        return jsonify({'message': 'User created successfully', 'access_token': access_token}), 201
    except Exception as e:
        print(e)
        return jsonify({'message': 'Failed to create user', 'error': str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = User.find_by_username(username)
    if not user or not bcrypt.check_password_hash(user['password'], password):
        return jsonify({'message': 'Invalid username or password'}), 401

    access_token = create_access_token(identity=username)
    return jsonify({'access_token': access_token}), 200

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

if __name__ == '__main__':
    app.run(debug=True)