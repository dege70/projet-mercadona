import logging
import os
from uuid import uuid4

from database import validate_test
from flask import (Blueprint, jsonify, make_response, redirect, request,
                   session, url_for)

# Configure le logger pour enregistrer les messages dans le fichier logs.txt
logs_dir = os.path.join(os.path.dirname(__file__), 'logs')
os.makedirs(logs_dir, exist_ok=True)
logs_path = os.path.join(logs_dir, 'logs.txt')
logging.basicConfig(filename=logs_path, level=logging.DEBUG)
logger = logging.getLogger(__name__)
handler = logging.FileHandler(logs_path)
handler.setLevel(logging.DEBUG) # configure le niveau de log pour le handler
logger.addHandler(handler)
logger.setLevel(logging.DEBUG)

auth_bp = Blueprint('auth', __name__)

auth_bp.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

@auth_bp.route('/auth/loginpage', methods=['POST'])
def validate_login():
    if request.method == 'POST':
        username = request.json['username']
        password = request.json['password']
        user = validate_test(username, password)
        logger.info(f"Utilisateur trouvé : {user}")
        if user is not None:
            # L'utilisateur est valide, redirige vers la page d'administration
            logger.info('Connexion avec succès (auth.py)')
            session['logged_in'] = True
            session['username'] = user['username']
            session['session_id'] = str(uuid4())
            response = make_response('Success')
            response.set_cookie('session_id', session['session_id'], secure=True, httponly=True, samesite='Strict')
            return 'Success'

        else:
            # L'utilisateur ou le mot de passe est incorrect, affiche un message d'erreur et redirige vers la page de connexion
            logger.info('Mot de passe invalide (app.py)')
            response = make_response(jsonify({'message': 'les informations d\'identification invalides (app.py)'}), 401)
            response.set_cookie('session_id', '', expires=0)
            return jsonify({'message': 'les informations d\'identification invalides (app.py)'}), 401

@auth_bp.route('/auth/logout')
def logout():
    session.pop('logged_in', None)
    session.pop('username', None)
    return redirect(url_for('auth.validate_loginpage'))


# @auth_bp.route('/auth/login', methods=['POST'])
# def login():
#     data = request.json
#     username = data['username']
#     password = data['password']
    
#     logger.debug(f'username (login view) (auth.py): {username}') 

#     user = validate_user(username, password)

#     logger.debug(f'SELECT * FROM admin WHERE username = "{username}"')

#     if user is None:
#         logger.debug('Nom d\'utilisateur invalide (auth.py)')
#         return jsonify({'message': 'les informations d\'identification invalides (auth.py)'}), 401

#     logger.debug(f'utilisateur (auth.py) 1 : {username}')
#     logger.debug(f'mot de passe (auth.py) 2 : {password}')
#     logger.debug(f'utilisateur (auth.py) 3 : {user}')
#     logger.debug(f'password_hash (auth.py) 4 : {user["password"]}')
    
#     if compare_hashed_passwords(user['password'], password, user['salt']):
#         logger.debug('Connexion avec succes (auth.py)')
#         return jsonify({'message': 'Connexion avec succes (auth.py)'}), 200
#     else:
#         logger.debug('Mot de passe invalide (auth.py)')
#         return jsonify({'message': 'les informations d\'identification invalides (auth.py)'}), 401
