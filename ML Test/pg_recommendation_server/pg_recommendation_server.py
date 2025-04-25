from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json

# Initialize Flask app
app = Flask(__name__)

# Global variables to hold data and trained model
pg_df = None
tfidf_matrix = None
vectorizer = None

# Function to load and train the model
def train_model():
    global pg_df, tfidf_matrix, vectorizer

    # Load PG data from a JSON file
    with open('pg_data.json', 'r') as file:
        raw_data = json.load(file)

    processed_data = []
    for item in raw_data:
        bed = item.get("bed", {})
        pg = bed.get("pg", {})
        features = [
            pg.get("address", ""),
            pg.get("state", ""),
            pg.get("pincode", ""),
            bed.get("type", ""),
            bed.get("gender", ""),
            bed.get("description", ""),
            str(bed.get("facilities_for_bed", [])),
            pg.get("pgname", "")
        ]
        combined_text = " ".join([str(f) for f in features])
        processed_data.append({
            "combined_text": combined_text,
            "pincode": pg.get("pincode", ""),
            "cost": bed.get("cost", ""),
            "type": bed.get("type", ""),
            "gender": bed.get("gender", ""),
            "state": pg.get("state", ""),
            "city": pg.get("address", "").split(",")[-2].strip() if "," in pg.get("address", "") else "",
            "pgname": pg.get("pgname", ""),
            "full_bed_data": bed
        })

    pg_df = pd.DataFrame(processed_data)

    # Vectorize combined feature text using TF-IDF
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(pg_df['combined_text'])

    print("Model trained with", len(pg_df), "records.")

# Helper function to extract city from input
def extract_city_from_input(text):
    cities = ["Kolkata", "Bangalore", "Delhi", "Mumbai", "Hyderabad", "Pune", "Chennai"]
    for city in cities:
        if city.lower() in text.lower():
            return city
    return ""

# Endpoint to receive user input and return matched PG
@app.route('/recommend', methods=['POST'])
def recommend_pg():
    global pg_df, tfidf_matrix, vectorizer

    user_input = request.json.get("query")
    if not user_input:
        return jsonify({"error": "Missing 'query' field in JSON"}), 400

    # Extract city and filter data
    user_city = extract_city_from_input(user_input)
    filtered_df = pg_df[pg_df['city'].str.lower() == user_city.lower()] if user_city else pg_df

    if filtered_df.empty:
        return jsonify({"error": f"No PGs found for city: {user_city}"}), 404

    # Vectorize the user input using the same TF-IDF vectorizer
    user_vec = vectorizer.transform([user_input])

    # Recompute similarity only for filtered data
    filtered_tfidf = vectorizer.transform(filtered_df['combined_text'])
    similarity_scores = cosine_similarity(user_vec, filtered_tfidf).flatten()

    top_indices = similarity_scores.argsort()[-5:][::-1]  # Top 5 results
    recommendations = filtered_df.iloc[top_indices].to_dict(orient='records')

    output = []
    for rec in recommendations:
        output.append({
            "pincode": rec["pincode"],
            "cost": rec["cost"],
            "type": rec["type"],
            "gender": rec["gender"],
            "state": rec["state"],
            "city": rec["city"],
            "pgname": rec["pgname"]
        })

    return jsonify(output), 200

if __name__ == '__main__':
    train_model()
    app.run(port=9500)

