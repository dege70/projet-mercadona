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

# Fonction pour récupérer toutes les promotions
def get_promotions():
    try:
        conn = get_db_conn()
        cur = conn.cursor()
        cur.execute('SELECT * FROM promotions;')
        promotions = cur.fetchall()
        cur.close()
        conn.close()
        return promotions
    except:
        return 'Erreur lors de la récupération des promotions'

# Fonction pour récupérer une promotion avec un id donné
def get_promotion(id):
    try:
        conn = get_db_conn()
        cur = conn.cursor()
        cur.execute('SELECT * FROM promotions WHERE id=%s;', (id,))
        promotion = cur.fetchone()
        cur.close()
        conn.close()
        return promotion
    except:
        return 'Erreur lors de la récupération de la promotion'

# Fonction pour ajouter une promotion
def add_promotion(name, description):
    try:
        conn = get_db_conn()
        cur = conn.cursor()
        cur.execute('INSERT INTO promotions (name, description) VALUES (%s, %s);', (name, description,))
        conn.commit()
        cur.close()
        conn.close()
        return 'Promotion ajoutée avec succès'
    except:
        return 'Erreur lors de l\'ajout de la promotion'

# Fonction pour modifier une promotion avec un id donné
def update_promotion(id, name, description):
    try:
        conn = get_db_conn()
        cur = conn.cursor()
        cur.execute('UPDATE promotions SET name=%s, description=%s WHERE id=%s;', (name, description, id,))
        conn.commit()
        cur.close()
        conn.close()
        return 'Promotion modifiée avec succès'
    except:
        return 'Erreur lors de la modification de la promotion'

# Fonction pour supprimer une promotion avec un id donné
def delete_promotion(id):
    try:
        conn = get_db_conn()
        cur = conn.cursor()
        cur.execute('DELETE FROM promotions WHERE id=%s;', (id,))
        conn.commit()
        cur.close()
        conn.close()
        return 'Promotion supprimée avec succès'
    except:
        return 'Erreur lors de la suppression de la promotion'
