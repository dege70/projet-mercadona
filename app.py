import logging
import os
import uuid
from datetime import datetime


from auth import Blueprint, auth_bp, validate_login
from database import (
    compare_hashed_passwords, connect, create_category, create_product,
    create_promotion, delete_category, delete_product, delete_promotion,
    get_categories, get_product, get_products, get_promotion, get_promotions,
    hash_password, update_product, update_promotion, validate_test, create_promotion_with_product, update_promotion_with_product)
from flask import Flask
from flask import current_app as app
from flask import (jsonify, redirect, request, send_from_directory, session,
                   url_for)
from flask_cors import CORS
from flask_session import Session
from werkzeug.security import check_password_hash

logger = logging.getLogger(__name__)
logger.addHandler(logging.NullHandler())

# Configure le logger pour enregistrer les messages dans le fichier logs.txt
logs_dir = os.path.join(os.path.dirname(__file__), 'logs')
os.makedirs(logs_dir, exist_ok=True)
logs_path = os.path.join(logs_dir, 'logs2.txt')
logging.basicConfig(filename=logs_path, level=logging.DEBUG)
logger = logging.getLogger(__name__)
handler = logging.FileHandler(logs_path)
handler.setLevel(logging.DEBUG) # configure le niveau de log pour le handler
logger.addHandler(handler)
logger.setLevel(logging.DEBUG)

# Crée une instance de l'application Flask
app = Flask(__name__, static_folder='build/static', template_folder='build')

# Définir une clé secrète pour les variables de session
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
# Initialise l'extension Flask-Session
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)
# app.config['SESSION_COOKIE_SECURE'] = True

# Définir une clé secrète pour les variables de session
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

# Configuration de la base de données
app.config['DATABASE_URL'] = os.environ.get('DATABASE_URL', 'postgres:// pxnuyiidetfjxu : 80011ba777c6f8e2256ce4d9a65fe47f47e5cebf120a2c0837e3abd072904f98 @ ec2-54-73-22-169.eu-west-1.compute.amazonaws.com : 5432 / d257ultfu65rlp')

# Crée le blueprint d'authentification
auth_bp = Blueprint('auth', __name__)

# # Route pour la page de la page authentification login
# @auth_bp.route('/auth/login', methods=['POST'])
# def login():
#     data = request.json
#     username = data['username']
#     password = data['password']
    
#     logger.debug(f'username (login view): {username}') 

#     user = validate_user(username, password)

#     logger.debug(f'SELECT * FROM admin WHERE username = "{username}"')

#     if user is None:
#         logger.debug('Nom d\'utilisateur invalide (app.py)')
#         return jsonify({'message': 'les informations d\'identification invalides'}), 401

#     if compare_hashed_passwords(user['password'], password, user['salt']):
#         logger.debug('Connexion avec succès (app.py)')
#         return jsonify({'message': 'Connexion avec succès (app.py)'}), 200
#     else:
#         logger.debug('Mot de passe invalide (app.py)')
#         return jsonify({'message': 'les informations d\'identification invalides (app.py)'}), 401

# Route pour la page de la page authentification login
@auth_bp.route('/auth/loginpage', methods=['POST'])
def loginpage():
    return validate_login()
  
# Enregistre le blueprint d'authentification
app.register_blueprint(auth_bp)

# Active le support CORS
CORS(app)


# route pour initialiser la session
@app.route('/init-session', methods=['POST'])
def init_session():
    # génération d'un nouvel identifiant de session
    session_id = str(uuid.uuid4())
    session['session_id'] = session_id
    return jsonify({'session_id': session_id})

# fonction pour ajouter des en-têtes aux réponses
@app.after_request
def add_header(response):
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response 

@app.before_request
def require_login():
    # Chemins qui ne nécessitent pas d'authentification
    whitelist = ['/loginpage']

    # Vérification de la présence du nom d'utilisateur dans la session
    if request.path.startswith('/admin') and 'username' not in session and request.path not in whitelist:
        return redirect(url_for('loginpage'))


# @app.after_request
# def add_cookie(response):
#     if 'session_id' in session:
#         response.headers['Set-Cookie'] = 'session=' + session['session_id'] + 'SamSite=None; Secure; HttpOnly; Path=/'
#     return response 


# Route de test pour la connexion à la page AdminList.js
@app.route('/api/admins')
def get_admins():
    conn = connect()
    cur = conn.cursor()
    cur.execute('SELECT * FROM admin')
    admins = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(admins)

# Route pour la page d'accueil
@app.route('/')
def homepage():
    return send_from_directory('build', 'index.html')

# Route pour la page du catalogue
@app.route('/catalogue')
def catalogue():
    category = request.args.get('category')
    products = get_products()
    if category:
        try:
            category_int = int(category)
            products = [p for p in products if p['idcategorie'] == category_int]
        except ValueError:
            pass
    return send_from_directory('build', 'index.html')

# Chemin pour les images
UPLOAD_FOLDER = 'public/images/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Route pour afficher les images
@app.route('/public/images/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Route pour les catégories
@app.route('/api/categories', methods=['GET', 'POST'])
def get_categories_route():
    return jsonify(get_categories())

# Route pour les produits
@app.route('/api/products', methods=['GET', 'POST'])
def get_products_route():
    return jsonify(get_products())

# Route pour les promotions
@app.route('/api/promotions', methods=['GET', 'POST'])
def get_promotions_route():
    return jsonify(get_promotions())

# Route pour la connexion au formulaire
# @app.route('/loginpage')
# def loginpage():
#     return send_from_directory('build', 'index.html')

# Route pour la connexion
@app.route('/dashboard')
def dashboard():
    return send_from_directory('build', 'index.html')

@app.route('/admin-list')
def adminlist():
    # Vérifier si l'utilisateur est connecté
    if 'username' in session:
        logger.info("La session contient la clé 'username'")
        return send_from_directory('build', 'index.html')
    else:
        # Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
        logger.info("Redirection vers /loginpage")
        return redirect('/loginpage')

# Route pour la page d'administration
@app.route('/admin')
def admin():
    # Vérifier si l'utilisateur est connecté
    if 'username' in session:
        logger.info("La session contient la clé 'username'")
        return send_from_directory('build', 'index.html')
    else:
        # Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
        logger.info("Redirection vers /loginpage")
        return redirect('/loginpage')

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect('/')

@app.route('/api/admin/product/create', methods=['POST'])
def create_product_route():
    data = request.json
    product = {
        'libelle': data['libelle'],
        'description': data['description'],
        'prix': data['prix'],
        'image': data['image'],
        'idcategorie': data['idcategorie']
    }
    create_product(product)
    return jsonify({'message': 'Produit créé avec succès !'}), 201


# Route pour le formulaire de modification de produit
@app.route('/admin/product/<int:id>/edit', methods=['PUT'])
def edit_product_route(id):
    product = get_product(id)
    if not product:
        return jsonify({'error': 'Product not found!'}), 404

    update_product(id, request.form)
    return jsonify({'message': 'Product updated successfully!'})

# Route pour la suppression de produit
@app.route('/admin/product/<int:id>/delete', methods=['DELETE'])
def delete_product_route(id):
    product = get_product(id)
    if not product:
        return jsonify({'error': 'Product not found!'}), 404

    delete_product(id)
    return jsonify({'message': 'Product deleted successfully!'})

# Route pour la création d'un catégorie
@app.route('/api/admin/categorie/create', methods=['POST'])
def create_categorie_route():
    data = request.json
    print(data)
    category = {
        'libelle': data['libelle']
    }
    create_category(category)
    return jsonify({'message': 'Catégorie créé avec succès !'}), 201

# Route pour ajouter une promotion
@app.route('/api/admin/promotion/create', methods=['POST'])
def create_promotion_route():
    data = request.json
    print(data)
    
# Vérifier que la clé 'idpromotion' est présente dans le dictionnaire 'data'
    if 'produit' in data:
        # Créer la promotion
        promotion_data = {
            'pourcentage': data['pourcentage'],
            'datedebut': datetime.strptime(data['datedebut'], '%Y-%m-%d').date(),
            'datefin': datetime.strptime(data['datefin'], '%Y-%m-%d').date(),
            'produit': data['produit']
        }
        # Insérer la promotion avec le produit associé
        create_promotion_with_product(promotion_data, data['produit'])

        return jsonify({'message': 'Promotion created successfully!'}), 201
    else:
        return jsonify({'error': 'produit key missing in data!'}), 400

# Route pour mettre à jour une promotion
@app.route('/api/admin/promotion/update/<int:idpromotion>', methods=['PUT'])
def update_promotion_route(idpromotion):
    data = request.json

    # Mettre à jour la promotion
    promotion = {
        'pourcentage': data['pourcentage'],
        'datedebut': data['datedebut'],
        'datefin': data['datefin']
    }
    update_promotion_with_product(idpromotion, promotion, data['idproduit'])

    return jsonify({'message': 'Promotion updated successfully!'}), 200


# Route pour la modification de promotion
@app.route('/admin/promotion/<int:id>/edit', methods=['PUT'])
def edit_promotion_route(id):
    promotion = get_promotion(id)
    if not promotion:
        return jsonify({'error': 'Promotion not found!'}), 404

    update_promotion(id, request.form)
    return jsonify({'message': 'Promotion updated successfully!'})

# Route pour la suppression de promotion
@app.route('/admin/promotion/<int:id>/delete', methods=['DELETE'])
def delete_promotion_route(id):
    promotion = get_promotion(id)
    if not promotion:
        return jsonify({'error': 'Promotion not found!'}), 404
    
    delete_promotion(id)
    return jsonify({'message': 'Promotion deleted successfully!'})

# Route pour les fichiers statiques CSS
@app.route('/static/css/<path:path>')
def serve_static_css(path):
    return send_from_directory('build/static/css', path)

# Route pour les fichiers statiques JavaScript
@app.route('/static/js/<path:path>')
def serve_static_js(path):
    return send_from_directory('build/static/js', path)

# Définissez la route catch-all pour renvoyer la page d'accueil index.html
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return send_from_directory(app.static_folder, 'index.html')

# Gestion des erreurs 404
@app.errorhandler(404)
def not_found(error):
    return send_from_directory('build', 'index.html')


if __name__ == '__main__':
    with app.app_context():
        port = int(os.environ.get('PORT', 5000))
        app.run(debug=True)
