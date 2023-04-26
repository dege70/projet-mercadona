import binascii
import hashlib
import logging
import os

import psycopg2
from flask import Flask, session
from flask_cors import CORS
from psycopg2.extras import RealDictCursor
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Création d'une instance de logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# Configuration de la sortie des logs vers un fichier
# file_handler = logging.FileHandler('database.log')
# file_handler.setLevel(logging.INFO)
# file_handler.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))
# logger.addHandler(file_handler)
# Configurer le logger pour enregistrer les messages dans le fichier logs.txt
logs_dir = os.path.join(os.path.dirname(__file__), 'logs')
os.makedirs(logs_dir, exist_ok=True)
logs_path = os.path.join(logs_dir, 'logs.txt')
logging.basicConfig(filename=logs_path, level=logging.DEBUG)
logger = logging.getLogger(__name__)
handler = logging.FileHandler(logs_path)
handler.setLevel(logging.DEBUG) # configure le niveau de log pour le handler
logger.addHandler(handler)
logger.setLevel(logging.DEBUG)

# Connexion à la base de données
def connect():
    conn = psycopg2.connect(
        user="pxnuyiidetfjxu",
        password="80011ba777c6f8e2256ce4d9a65fe47f47e5cebf120a2c0837e3abd072904f98",
        host="ec2-54-73-22-169.eu-west-1.compute.amazonaws.com",
        port="5432",
        database="d257ultfu65rlp"
    )
    conn.set_session(autocommit=True)
    
    try:
        cur = conn.cursor()
        cur.execute("SELECT * FROM admin")
        cur.close()
        logger.info("La connexion a la base de donnees et la table admin sont OK (database.py)")
    except psycopg2.Error as e:
        logger.error("La connexion a la base de donnees a echoue (database.py): %s", e)
        
    return conn

# def generate_hashed_password(password):
#     new_password = generate_password_hash(password, method='sha256', salt_length=16)
#     logger.info(f'Voici le mot de passe généré pour Lnaho69 : {new_password}')
#     return new_password.decode("uft-8")

# Appeler la fonction avec le mot de passe 'Lnaho69'
# new_password = generate_hashed_password("Lnaho69")
# with open('output.txt', 'w') as f:
#     f.write(new_password)

# Fonction pour hacher le mot de passe
def hash_password(password, salt):
    salt_bytes = salt.encode("utf-8")
    logger.info(f'Voici le salt de hash_password : {salt}')
    
    # Encode the password as bytes
    password_bytes = password.encode("utf-8")
    logger.info(f'Voici le resultat de la variable password_bytes : {password_bytes}')

    # Hash the password using SHA-256 algorithm
    hashed_password_bytes = hashlib.sha256(salt_bytes + password_bytes).digest()
    logger.info(f'Voici le resultat de la variable hashed_password_bytes : {hashed_password_bytes} ')

    # Encode the hashed password and salt as strings and return them
    hashed_password = "sha256$" + binascii.hexlify(salt_bytes).decode("utf-8") + "$" + binascii.hexlify(hashed_password_bytes).decode("utf-8")

    logger.info(f'Voici le resultat de la variable hashed_password : {hashed_password}')
    
    return hashed_password

def compare_hashed_passwords(db_hash, password, salt):
    logger.info(f'db_hash (compare_hashed_passwords): {db_hash}')

    # hasher le mot de passe fourni avec le même salt que le hash enregistré
    hashed_password = hash_password(password, salt)
    logger.info(f'compare_hashed_passwords({db_hash}, {password}, {salt}): {hashed_password}')

    # comparer les deux hashes
    if hashed_password == db_hash:
        logger.info('Le mot de passe est correct (compare_hashed_passwords)')
        return True
    else:
        logger.info('Le mot de passe est incorrect (compare_hashed_passwords)')
        return False

def validate_test(username, password):
    conn = connect()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cursor.execute('SELECT * FROM admin WHERE username = %s', (username,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if user is not None:
        if user['password'] == password:
            session['username'] = username
            session['isAuthenticated'] = True
            logger.info(f'Utilisateur trouvé (database.py): {user}')
            return user
        else:
            logger.info(f'Le mot de passe ne correspond pas (database.py): {password}')
            return None
    else:
        logger.info(f'Utilisateur non trouvé (database.py): {username}')
        return None

# def validate_user(username, password):
#     conn = connect()
#     cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
#     cursor.execute('SELECT * FROM admin WHERE username = %s', (username,))
#     user = cursor.fetchone()
#     cursor.close()
#     conn.close()

#     if user is not None:
#         db_hash = user['password']
#         salt = db_hash.split('$')[1]
#         if compare_hashed_passwords(db_hash, password, salt):
#             logger.info(f'Utilisateur trouvé (database.py): {user}')
#             return user
#         else:
#             logger.info(f'Le mot de passe ne correspond pas (database.py): {password}')
#             return None
#     else:
#         logger.info(f'Utilisateur non trouvé (database.py): {username}')
#         return None

# # Pour tester la fonction validate_user
# # Remplacez "votre_nom_utilisateur" par votre nom d'utilisateur valide dans la base de données
# username = 'david'
# # Remplacez "votre_mot_de_passe" par le mot de passe correspondant à cet utilisateur dans la base de données
# password = "sha256$31323334$d84464181f7f019f3fb10e6bbd06f543d7ac84c4f8e360ebb9402a472ab30ebc"

# # valider l'utilisateur
# user = validate_user(username, password)

# # afficher le résultat de la validation
# if user is not None:
#     print(f"L'utilisateur {username} a ete valide avec succes.")
# else:
#     print(f"Impossible de valider l'utilisateur {username}.")

# Récupération des catégories
def get_categories():
    conn = connect()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM categorie")
    categories = cursor.fetchall()
    cursor.close()
    conn.close()
    return categories


# Récupération des produits
def get_products():
    conn = connect()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM produit")
    products = cursor.fetchall()
    print(products)
    cursor.close()
    conn.close()
    return products


# Récupération des promotions
def get_promotions():
    conn = connect()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM promotion")
    promotions = cursor.fetchall()
    cursor.close()
    conn.close()
    return promotions


# Récupération d'un produit en fonction de son id
def get_product(id):
    conn = connect()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM produit WHERE idproduit = %s", (id,))
    product = cursor.fetchone()
    cursor.close()
    conn.close()
    return product


# Récupération d'une promotion en fonction de son id
def get_promotion(id):
    conn = connect()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT * FROM promotion WHERE idpromotion = %s", (id,))
    promotion = cursor.fetchone()
    cursor.close()
    conn.close()
    return promotion


# Création d'une catégorie
def create_category(category):
    conn = connect()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO categorie (libelle) VALUES (%s)", (category['libelle'],))
    conn.commit() 
    cursor.close()
    conn.close()


# Création d'un produit
def create_product(product):
    conn = connect()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO produit (libelle, description, prix, image, idcategorie) VALUES (%s, %s, %s, %s, %s)", (product['libelle'], product['description'], product['prix'], product['image'], product['idcategorie']))
        conn.commit() 
        logger.info('Insertion du produit réussie')
        logging.debug('Insertion du produit réussie')
    except:
        logger.info('Erreur lors de l\'insertion du produit')
        logging.error('Erreur lors de l\'insertion du produit')
    cursor.close()
    conn.close()
    
# Suppression d'une catégorie
def delete_category(id):
    conn = connect()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM categorie WHERE idcategorie = %s", (id,))
    conn.commit() 
    cursor.close()
    conn.close()

# Création d'une promotion
def create_promotion(promotion):
    conn = connect()
    cursor = conn.cursor()
    
    cursor.execute("INSERT INTO promotion (idproduit, pourcentage, datedebut, datefin) VALUES (%s, %s, %s, %s)", (promotion['idproduit'], promotion['pourcentage'], promotion['datedebut'], promotion['datefin']))
    conn.commit() 
    cursor.close()
    conn.close()
    
def create_promotion_with_product(promotion, produit):
    conn = connect()
    cursor = conn.cursor()
    
    # Vérifier si une promotion existe déjà pour le produit
    cursor.execute(
        "SELECT idpromotion FROM produit_promotion WHERE idproduit = %s",
        (produit,)
    )
    row = cursor.fetchone()

    if row is not None:
        # Une promotion existe déjà pour ce produit - mettre à jour les données de promotion existantes
        promotion_id = row[0]
    else:    
        # Convertir les dates de datetime à str
        promotion['datedebut'] = promotion['datedebut'].strftime('%Y-%m-%d')
        promotion['datefin'] = promotion['datefin'].strftime('%Y-%m-%d')

        # Aucune promotion pour ce produit - insérer une nouvelle promotion
        cursor.execute(
            "INSERT INTO promotion (pourcentage, datedebut, datefin) VALUES (%s, %s, %s) RETURNING idpromotion",
        (promotion['pourcentage'], promotion['datedebut'], promotion['datefin'])
        )
        promotion_id = cursor.fetchone()[0]  

        # Insérer la relation produit-promotion dans la table produit_promotion
        cursor.execute(
            "INSERT INTO produit_promotion (idproduit, idpromotion) VALUES (%s, %s)",
            (produit, promotion_id)
        )

    conn.commit()
    cursor.close()
    conn.close()
    return promotion_id


# Suppression d'un produit en fonction de son id
def delete_product(id):
    conn = connect()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM produit WHERE idproduit = %s", (id,))
    conn.commit() 
    cursor.close()
    conn.close()

# Suppression d'une promotion en fonction de son id
def delete_promotion(id):
    conn = connect()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM promotion WHERE idpromotion = %s", (id,))
    conn.commit() 
    cursor.close()
    conn.close()

# Mise à jour d'un produit en fonction de son id
def update_product(id, data):
    conn = connect()
    cursor = conn.cursor()
    query = "UPDATE produit SET "
    for key in data:
        query += f"{key} = %s,"
    query = query[:-1]
    query += f" WHERE idproduit = {id}"
    values = tuple(data.values())
    cursor.execute(query, values)
    cursor.close()
    conn.close()

def update_promotion_with_product(idpromotion, promotion, idproduit):
    conn = connect()
    cursor = conn.cursor()

    # Mettre à jour la promotion dans la table promotion
    cursor.execute(
        "UPDATE promotion SET pourcentage = %s, datedebut = %s, datefin = %s WHERE idpromotion = %s",
        (promotion['pourcentage'], promotion['datedebut'], promotion['datefin'], idpromotion)
    )

    # Mettre à jour la relation produit-promotion dans la table produit_promotion
    cursor.execute(
        "UPDATE produit_promotion SET idproduit = %s WHERE idpromotion = %s",
        (idproduit, idpromotion)
    )

    conn.commit()
    cursor.close()
    conn.close()


def delete_promotion(id):
    conn = connect()
    cursor = conn.cursor()

    # Supprimer la promotion dans la table promotion
    cursor.execute(
        "DELETE FROM promotion WHERE idpromotion = %s",
        (id,)
    )

    # Supprimer la relation produit-promotion dans la table produit_promotion
    cursor.execute(
        "DELETE FROM produit_promotion WHERE idpromotion = %s",
        (id,)
    )

    conn.commit()
    cursor.close()
    conn.close()


# Mise à jour d'une promotion en fonction de son identifiant
def update_promotion(id, promotion):
    conn = connect()
    cursor = conn.cursor()

    query = """
        UPDATE promotion SET
            idproduit = %s,
            pourcentage = %s,
            datedebut = %s,
            datefin = %s
        WHERE idpromotion = %s
    """
    values = (
        promotion['idproduit'],
        promotion['pourcentage'],
        promotion['datedebut'],
        promotion['datefin'],
        id
    )

    cursor.execute(query, values)
    conn.commit()
    cursor.close()
    conn.close()
