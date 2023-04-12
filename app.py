# import des modules
import os

from flask import Flask, jsonify, render_template, request, send_from_directory

# Initialisation de l'application Flask
app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

# Configuration de la base de données
app.config['DATABASE_URL'] = os.environ.get('DATABASE_URL', 'postgresql://postgres:Lnaaotco@69!@localhost:5432/mercadona')

# Route pour la page d'accueil
@app.route('/')
def home():
    return send_from_directory('build', 'index.html')

# Route pour les catégories
@app.route('/api/categories')
def get_categories():
    return jsonify(categories.get_categories())

# Route pour les produits
@app.route('/api/product')
def get_products():
    return jsonify(product.get_products())

# Route pour les promotions
@app.route('/api/promotions')
def get_promotions():
    return jsonify(promotions.get_promotions())

# Route pour la page d'administration
@app.route('/admin')
def admin():
    return send_from_directory('build', 'index.html')

# Route pour le formulaire de création de produit
@app.route('/admin/product/create')
def create_product():
    return send_from_directory('build', 'index.html')

# Route pour le formulaire de modification de produit
@app.route('/admin/product/<int:id>/edit')
def edit_product(id):
    return send_from_directory('build', 'index.html')

# Route pour le formulaire de création de promotion
@app.route('/admin/promotion/create')
def create_promotion():
    return send_from_directory('build', 'index.html')

# Route pour le formulaire de modification de promotion
@app.route('/admin/promotion/<int:id>/edit')
def edit_promotion(id):
    return send_from_directory('build', 'index.html')

# Route pour le formulaire de création de catégorie
@app.route('/admin/category/create')
def create_category():
    return send_from_directory('build', 'index.html')

# Route pour le formulaire de modification de catégorie
@app.route('/admin/category/<int:id>/edit')
def edit_category(id):
    return send_from_directory('build', 'index.html')

# Route pour les fichiers statiques CSS
@app.route('/static/css/<path:path>')
def serve_static_css(path):
    return send_from_directory('build/static/css', path)

# Route pour les fichiers statiques JavaScript
@app.route('/static/js/<path:path>')
def serve_static_js(path):
    return send_from_directory('build/static/js', path)

# Démarrage de l'application Flask
if __name__ == '__main__':
    app.run(debug=True)
