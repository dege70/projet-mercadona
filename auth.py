import logging
import os
from uuid import uuid4

from database import compare_hashed_passwords, validate_user
from flask import (Blueprint, jsonify, make_response, redirect, request, session, url_for)

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

@auth_bp.route('/auth/login', methods=['POST'])
def validate_login():
    if request.method == 'POST':
        username = request.json['username']
        password = request.json['password']
        user = validate_user(username, password)
        logger.info(f"Utilisateur trouvé : {user}")
        if user is not None:
            # L'utilisateur est valide, redirige vers la page d'administration
            logger.info('Connexion avec succès (auth.py)')
            session['logged_in'] = True
            session['username'] = user['username']
            session['session_id'] = str(uuid4())
            response = make_response('Success')
            response.set_cookie('session_id', session['session_id'], secure=True, httponly=True, samesite='Strict')
            return response
        else:
            # L'utilisateur ou le mot de passe est incorrect, affiche un message d'erreur et redirige vers la page de connexion
            logger.info('Nom d\'utilisateur ou mot de passe invalide (app.py)')
            response = make_response(jsonify({'message': 'Nom d\'utilisateur ou mot de passe invalide (app.py)'}), 401)
            response.set_cookie('session_id', '', expires=0, secure=True, httponly=True, samesite='Strict')
            return response


@auth_bp.route('/auth/logout')
def logout():
    session.pop('logged_in', None)
    session.pop('username', None)
    return redirect(url_for('auth.validate_login'))
