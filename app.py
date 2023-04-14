# import des modules
import os
from datetime import datetime
from flask import Flask, jsonify, render_template, request, send_from_directory
from flask_cors import CORS
from database import (create_category, create_product, create_promotion,
                      delete_category, delete_product, delete_promotion,
                      get_categories, get_product, get_products,
                      get_promotion, get_promotions, update_product,
                      update_promotion)

# Initialisation de l'application Flask
app = Flask(__name__)
CORS(app)
app.config['JSON_SORT_KEYS'] = False

# Configuration de la base de données
app.config['DATABASE_URL'] = os.environ.get('DATABASE_URL', 'postgresql://postgres:Lnaaotco@69!@localhost:5432/mercadona')

# Route pour la page d'accueil
@app.route('/')
def home():
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

# Route pour les catégories
@app.route('/api/categories')
def get_categories_route():
    return jsonify(get_categories())

# Route pour les produits
@app.route('/api/products')
def get_products_route():
    return jsonify(get_products())

# Route pour les promotions
@app.route('/api/promotions')
def get_promotions_route():
    return jsonify(get_promotions())

# Route pour la page d'administration
@app.route('/admin')
def admin():
    return send_from_directory('build', 'index.html')

# Route pour le formulaire de création de produit
@app.route('/admin/product/create', methods=['POST'])
def create_product():
    product = {
        'libelle': request.form['libelle'],
        'description': request.form['description'],
        'prix': float(request.form['prix']),
        'idcategorie': int(request.form['idcategorie']),
        'image': request.form['image']
    }
    create_product(product)
    return jsonify({'message': 'Product created successfully!'}), 201

# Route pour le formulaire de modification de produit
@app.route('/admin/product/<int:id>/edit', methods=['PUT'])
def edit_product(id):
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

# Route pour le formulaire de création de promotion
@app.route('/admin/promotion/create', methods=['POST'])
def create_promotion():
    promotion = {
        'idproduit': int(request.form['idproduit']),
        'reduction': float(request.form['reduction']),
        'datedebut': datetime.strptime(request.form['datedebut'], '%Y-%m-%d'),
        'datefin': datetime.strptime(request.form['datefin'], '%Y-%m-%d')
    }
    create_promotion(promotion)
    return jsonify({'message': 'Promotion created successfully!'}), 201

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