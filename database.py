import psycopg2

# Connexion à la base de données PostgreSQL
def get_db_conn():
    conn = psycopg2.connect(
        host='localhost',
        database='mercadona',
        user='postgres',
        password='Lnaaotco@69!'
    )
    return conn

# Fonction pour récupérer toutes les catégories
def get_categories():
    try:
        conn = get_db_conn()
        cur = conn.cursor()
        cur.execute('SELECT * FROM categorie;')
        categories = cur.fetchall()
        cur.close()
        conn.close()
        return categories
    except Exception as e:
        print("Erreur lors de la récupération des catégories :", e)
        return []

# Fonction pour récupérer toutes les promotions
def get_promotions():
    try:
        conn = get_db_conn()
        cur = conn.cursor()
        cur.execute('SELECT * FROM promotion;')
        promotions = cur.fetchall()
        cur.close()
        conn.close()
        return promotions
    except Exception as e:
        print("Erreur lors de la récupération des promotions :", e)
        return []

# Fonction pour récupérer tous les produits
def get_products():
    try:
        conn = get_db_conn()
        cur = conn.cursor()
        cur.execute('SELECT * FROM produit;')
        products = cur.fetchall()
        cur.close()
        conn.close()
        return products
    except Exception as e:
        print("Erreur lors de la récupération des produits :", e)
        return []
