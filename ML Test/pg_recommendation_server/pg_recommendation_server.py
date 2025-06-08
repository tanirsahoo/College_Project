# from flask import Flask, request, jsonify
# import pandas as pd
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity
# import json
# import requests

# app = Flask(__name__)

# pg_df = None
# tfidf_matrix = None
# vectorizer = None

# def train_model():
#     global pg_df, tfidf_matrix, vectorizer

#     with open('pg_data.json', 'r') as file:
#         raw_data = json.load(file)

#     processed_data = []
#     for item in raw_data:
#         bed = item.get("bed", {})
#         pg = bed.get("pg", {})
#         features = [
#             pg.get("address", ""),
#             pg.get("state", ""),
#             pg.get("pincode", ""),
#             bed.get("type", ""),
#             bed.get("gender", ""),
#             bed.get("description", ""),
#             str(bed.get("facilities_for_bed", [])),
#             pg.get("pgname", "")
#         ]
#         combined_text = " ".join([str(f) for f in features])
#         processed_data.append({
#             "combined_text": combined_text,
#             "pincode": pg.get("pincode", ""),
#             "cost": bed.get("cost", ""),
#             "type": bed.get("type", ""),
#             "gender": bed.get("gender", ""),
#             "state": pg.get("state", ""),
#             "city": pg.get("address", "").split(",")[-2].strip() if "," in pg.get("address", "") else "",
#             "pgname": pg.get("pgname", ""),
#             "full_bed_data": bed
#         })

#     pg_df = pd.DataFrame(processed_data)

#     vectorizer = TfidfVectorizer(stop_words='english')
#     tfidf_matrix = vectorizer.fit_transform(pg_df['combined_text'])

#     print("Model trained with", len(pg_df), "records.")

# def extract_city_from_input(text):
#     cities = ["Kolkata", "Bangalore", "Delhi", "Mumbai", "Hyderabad", "Pune", "Chennai"]
#     for city in cities:
#         if city.lower() in text.lower():
#             return city
#     return ""

# def get_pincodes_from_city(city):
#     try:
#         url = f"https://api.postalpincode.in/postoffice/{city}"
#         response = requests.get(url)
#         data = response.json()

#         if data and data[0]["Status"] == "Success":
#             pincodes = list(set([post["Pincode"] for post in data[0]["PostOffice"]]))
#             return pincodes
#     except Exception as e:
#         print("❌ Error fetching pincodes:", e)

#     return []

# @app.route('/recommend', methods=['POST'])
# def recommend_pg():
#     global pg_df, tfidf_matrix, vectorizer

#     user_input = request.json.get("query")
#     if not user_input:
#         return jsonify({"error": "Missing 'query' field in JSON"}), 400

#     # Extract city and fetch pincodes if city is found
#     user_city = extract_city_from_input(user_input)
#     valid_pincodes = get_pincodes_from_city(user_city) if user_city else []

#     # Filter data based on city and pincodes
#     if valid_pincodes:
#         filtered_df = pg_df[pg_df['pincode'].astype(str).isin(valid_pincodes)]
#         if filtered_df.empty:
#             filtered_df = pg_df  # fallback if no PGs found for those pincodes
#     else:
#         filtered_df = pg_df

#     # Vectorize user input
#     user_vec = vectorizer.transform([user_input])
#     filtered_tfidf = vectorizer.transform(filtered_df['combined_text'])

#     similarity_scores = cosine_similarity(user_vec, filtered_tfidf).flatten()
#     filtered_df = filtered_df.copy()
#     filtered_df['similarity'] = similarity_scores

#     # Sort by similarity DESC (most relevant first)
#     sorted_df = filtered_df.sort_values(by='similarity', ascending=False)

#     output = []
#     for _, rec in sorted_df.iterrows():
#         output.append({
#             "pgname": rec["pgname"],
#             "pincode": rec["pincode"],
#             "cost": rec["cost"],
#             "type": rec["type"],
#             "gender": rec["gender"],
#             "state": rec["state"],
#             "city": rec["city"],
#             "similarity_score": round(rec["similarity"], 3)
#         })

#     return jsonify(output), 200

# if __name__ == '__main__':
#     train_model()
#     app.run(port=9500)





from flask import Flask, request, jsonify
from flask_cors import CORS  # ✅ Added CORS import
import requests
import nltk
import re
from nltk.corpus import stopwords
from nltk.tokenize import wordpunct_tokenize
from sentence_transformers import SentenceTransformer, util

nltk.download('stopwords')
stop_words = set(stopwords.words("english"))

app = Flask(__name__)
CORS(app)  # ✅ Enable CORS for all routes and origins

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
