import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime


# Connexion à la base de données
def connect():
    conn = psycopg2.connect(
        user="postgres",
        password="Lnaaotco@69!",
        host="localhost",
        port="5432",
        database="mercadona"
    )
    conn.set_session(autocommit=True)
    return conn


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
    cursor.execute("INSERT INTO categorie (nom) VALUES (%s)", (category['nom'],))
    cursor.close()
    conn.close()


# Création d'un produit
def create_product(product):
    conn = connect()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO produit (libelle, description, prix, idcategorie, image) VALUES (%s, %s, %s, %s, %s)", (product['libelle'], product['description'], product['prix'], product['idcategorie'], product['image']))
    cursor.close()
    conn.close()
    
# Suppression d'une catégorie
def delete_category(id):
    conn = connect()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM categorie WHERE idcategorie = %s", (id,))
    cursor.close()
    conn.close()

# Création d'une promotion
def create_promotion(promotion):
    conn = connect()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO promotion (idproduit, reduction, datedebut, datefin) VALUES (%s, %s, %s, %s)", (promotion['idproduit'], promotion['reduction'], promotion['datedebut'], promotion['datefin']))
    cursor.close()
    conn.close()

# Suppression d'un produit en fonction de son id
def delete_product(id):
    conn = connect()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM produit WHERE idproduit = %s", (id,))
    cursor.close()
    conn.close()

# Suppression d'une promotion en fonction de son id
def delete_promotion(id):
    conn = connect()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM promotion WHERE idpromotion = %s", (id,))
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


# Mise à jour d'une promotion en fonction de son identifiant
def update_promotion(id, promotion):
    conn = connect()
    cursor = conn.cursor()

    query = """
        UPDATE promotion SET
            idproduit = %s,
            reduction = %s,
            datedebut = %s,
            datefin = %s
        WHERE idpromotion = %s
    """
    values = (
        promotion['idproduit'],
        promotion['reduction'],
        promotion['datedebut'],
        promotion['datefin'],
        id
    )

    cursor.execute(query, values)
    conn.commit()
    cursor.close()
    conn.close()


