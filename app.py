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

@app.route('/static/js/<path:path>')
def serve_static_js(path):
    return send_from_directory('build/static/js', path)

@app.route('/static/css/<path:path>')
def serve_static_css(path):
    return send_from_directory('build/static/css', path)

if __name__ == '__main__':
    app.run(debug=True)
