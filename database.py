import binascii
import hashlib
import logging
import os
from datetime import datetime

import psycopg2
from flask import Flask, session
from flask_cors import CORS
from psycopg2.extras import RealDictCursor
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Création d'une instance de logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# Configuration de la sortie des logs vers un fichier
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
        user="dizxjeenrwboop",
        password="3d7d57e8337e12846b41aa6d5dddaaa3d122740ac4997332866c9bf9f3c5aa26",
        host="ec2-63-34-69-123.eu-west-1.compute.amazonaws.com",
        port="5432",
        database="d86kvu1epdl3a0"
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

# Générer un mot de passe
# def generate_hashed_password(password):
#     new_password = generate_password_hash(password, method='sha256', salt_length=16)
#     logger.info(f'Voici le mot de passe généré pour Lnaho69 : {new_password}')
#     return new_password.decode("uft-8")
# # Appeler la fonction avec le mot de passe 'Lnaho69'
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
    hashed_password = "sha256$" + salt + "$" + binascii.hexlify(hashed_password_bytes).decode("utf-8")

    logger.info(f'Voici le resultat de la variable hashed_password : {hashed_password}')
    
    return hashed_password

# La fonction pour comparer le hash de mot passe saisie avec le mot de passe de la base de données
def compare_hashed_passwords(hashed_password, password, salt):
    # Parse the hashed password string
    parts = hashed_password.split("$")
    salt = parts[1]
    logger.info(f'Voici le salt de la fonction compare_hashed_passwords : {salt}')
    
    # Hash the entered password with the same salt as the stored password
    entered_password_hash = hash_password(password, salt)
    
    # Compare the two hashed passwords
    return entered_password_hash == hashed_password

# La fonction pour valider que l'utilisation est identifié avec mot de passe
def validate_user(username, password):
    conn = connect()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cursor.execute('SELECT * FROM admin WHERE username = %s', (username,))
    user = cursor.fetchone()
    cursor.close()

    if user is not None:
        db_hash = user['password']
        salt = db_hash.split('$')[1]
        session['username'] = username
        session['isAuthenticated'] = True
        logger.info(f'Utilisateur trouvé (database.py): {user}')
        if compare_hashed_passwords(db_hash, password, salt):
            logger.info(f'Utilisateur trouvé (database.py): {user}')
            conn.close()
            return user
        else:
            logger.info(f'Le mot de passe ne correspond pas (database.py): {password}')
            conn.close()
            return None
    else:
        logger.info(f'Utilisateur non trouvé (database.py): {username}')
        conn.close()
        return None
    
# La fonction pour créer un utilisateur administrateur
def create_admin(user):
    conn = connect()
    cursor = conn.cursor()
    
    # Générer un salt aléatoire
    salt = os.urandom(16).hex()

    # Hasher le mot de passe avec le salt
    hashed_password = hash_password(user['password'], salt)
    
    # Insérer l'utilisateur dans la table utilisateur
    cursor.execute("INSERT INTO utilisateur (username, password) VALUES (%s, %s)", (user['username'], hashed_password))
    
    # Insérer l'utilisateur dans la table admin
    cursor.execute("INSERT INTO admin (username, password) VALUES (%s, %s)", (user['username'], hashed_password))
    
    conn.commit() 
    cursor.close()
    conn.close()
    
# La fonction pour créer un utilisateur
def create_user(user):
    conn = connect()
    cursor = conn.cursor()
    
    # Générer un salt aléatoire
    salt = os.urandom(16).hex()

    # Hasher le mot de passe avec le salt
    hashed_password = hash_password(user['password'], salt)
    
    # Insérer l'utilisateur dans la table utilisateur
    cursor.execute("INSERT INTO utilisateur (username, password) VALUES (%s, %s)", (user['username'], hashed_password))
    
    conn.commit() 
    cursor.close()
    conn.close()
    

# Fonction pour extraire le sel du mot de passe haché
def extract_salt_from_password(password):
    return password.split("$")[1]

# Fonction pour récupérer le hash stocké dans la base de données pour un utilisateur donné
def get_stored_hash(username):
    conn = connect()
    cursor = conn.cursor()
    cursor.execute("SELECT password FROM utilisateur WHERE username = %s", (username,))
    result = cursor.fetchone()
    cursor.close()
    conn.close()
    if result:
        return result[0]
    else:
        return None

# Fonction pour récupérer le sel stocké dans la base de données pour un utilisateur donné
def get_salt(username):
    conn = connect()
    cursor = conn.cursor()
    cursor.execute("SELECT password FROM utilisateur WHERE username = %s", (username,))
    result = cursor.fetchone()
    cursor.close()
    conn.close()
    if result:
        hashed_password = result[0]
        return extract_salt_from_password(hashed_password)
    else:
        return None


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

# Création d'une promotion avec la sélection d'un produit    
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

# Mise à jour d'une promotion selon son produit
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

# Suppression d'une promotion
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
