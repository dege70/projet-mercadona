import os
from flask import Flask, jsonify, request, render_template, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['JSON_SORT_KEYS'] = False

# Configuration de la base de données
app.config['DATABASE_URL'] = os.environ.get('DATABASE_URL', 'postgresql://postgres:Lnaaotco@69!@localhost:5432/mercadona')

# Route pour la page d'accueil
@app.route('/')
def home():
    return send_from_directory('build', 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
