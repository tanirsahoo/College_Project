from flask import Flask, request, jsonify
from flask_cors import CORS  # Added CORS import
import requests
import nltk
import re
from nltk.corpus import stopwords
from nltk.tokenize import wordpunct_tokenize
from sentence_transformers import SentenceTransformer, util

nltk.download('stopwords')
stop_words = set(stopwords.words("english"))

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes and origins

model = SentenceTransformer('all-MiniLM-L6-v2')

def get_windows_host_ip():
    """Fetch Windows host IP from WSL."""
    try:
        with open("/etc/resolv.conf", "r") as f:
            content = f.read()
        match = re.search(r"nameserver\s+(\d+\.\d+\.\d+\.\d+)", content)
        return match.group(1) if match else "127.0.0.1"
    except:
        return "127.0.0.1"

def fetch_pg_data():
    host_ip = get_windows_host_ip()
    try:
        response = requests.get(f"http://{host_ip}:9000/beds", timeout=5)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching PG data: {e}")
        return []

def prepare_pg_text(entry):
    pg = entry.get("pg", {})
    return " ".join([
        str(pg.get("pgname", "")),
        str(pg.get("address", "")),
        str(pg.get("state", "")),
        str(entry.get("description", "")),
        str(entry.get("facilities_for_bed", "")),
        str(entry.get("gender", "")),
        str(entry.get("type", ""))
    ]).lower().strip()

@app.route("/search", methods=["POST"])
def search_pg():
    if not request.is_json:
        return jsonify({"error": "Expected JSON payload"}), 400

    data = request.get_json()
    query = data.get("value", "").strip()

    if not query:
        return jsonify({"error": "Missing or empty 'value' in request body"}), 400

    pg_data = fetch_pg_data()
    if not pg_data:
        return jsonify({"error": "Unable to fetch PG data"}), 500

    # Step 1: Prepare PG texts
    pg_texts = []
    valid_entries = []
    for entry in pg_data:
        text = prepare_pg_text(entry)
        if text:
            pg_texts.append(text)
            valid_entries.append(entry)

    # Step 2: Encode all PG entries + query
    pg_embeddings = model.encode(pg_texts, convert_to_tensor=True)
    query_embedding = model.encode(query, convert_to_tensor=True)

    # Step 3: Compute cosine similarity
    similarities = util.cos_sim(query_embedding, pg_embeddings)[0]
    sorted_indices = similarities.argsort(descending=True)

    # Step 4: Return sorted PGs
    sorted_pg_entries = [valid_entries[i] for i in sorted_indices]
    return jsonify(sorted_pg_entries)

if __name__ == "__main__":
    app.run(port=8000, debug=True)
