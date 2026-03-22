from flask import Flask, jsonify
from flask_cors import CORS
import json

# 1. App létrehozása
app = Flask(__name__)
CORS(app)  # Engedi, hogy más weboldalak is használhassák

# 2. Segédfüggvény - fájl olvasás
def load_data():
    with open('portfolio_data.json', 'r', encoding='utf-8') as f:
        return json.load(f)

# 3. Route-ok

@app.route('/')
def home():
    return "Muaves Portfolio API v1.0"

@app.route('/api/projects')
def get_projects():
    data = load_data()
    return jsonify(data['projects'])

@app.route('/api/projects/<int:id>')
def get_project(id):
    data = load_data()
    # Projektek 0-tól indexeltek, de URL-ben 1-től számolunk
    if 0 <= id - 1 < len(data['projects']):
        return jsonify(data['projects'][id - 1])
    return jsonify({"error": "Project not found"}), 404

@app.route('/api/links')
def get_links():
    data = load_data()
    return jsonify(data['links'])

@app.route('/api/about')
def get_about():
    data = load_data()
    return jsonify({"about": data['about']})

@app.route('/api/stats')
def get_stats():
    data = load_data()
    return jsonify({
        "total_projects": len(data['projects']),
        "total_links": len(data['links']),
        "version": data['version']
    })

# 4. Szerver indítása
if __name__ == '__main__':
    app.run(debug=True, port=5000)