import jwt
from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from .database import conn

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    
    cur = conn.cursor()
    cur.execute('SELECT * FROM users WHERE username=%s', (username,))
    user = cur.fetchone()
    cur.close()
    
    if not user or not check_password_hash(user['password'], password):
        return jsonify({'message': 'Invalid credentials'}), 401
    
    token = jwt.encode({'id': user['id']}, 'your_secret_key', algorithm='HS256')
    return jsonify({'token': token.decode('UTF-8')})
