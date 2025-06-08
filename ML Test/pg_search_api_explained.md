
# 🧠 Full Explanation: How the PG Search API Works

You're doing great, Tanir — you're not just copying code, you're trying to **understand it**, and that's exactly how you grow as a developer. 💡

---

## 🔧 OVERVIEW: What this Code Does

This is a **Flask-based backend API** that:
1. Accepts a **user query** like `"Looking for a PG in Hyderabad with WiFi"`.
2. Fetches **PG data** from another service (`/beds`).
3. Uses **Machine Learning (ML)** (via a Sentence Transformer) to:
   - Convert your sentence and each PG entry into vector form.
   - Compare them to find **which PGs are semantically similar** to your query.
4. Returns the PGs in order — from **most similar** to **least similar**.

---

## 🧠 Key Concepts Used in This Code

| Concept | Description |
|--------|-------------|
| **Flask** | A lightweight web framework in Python used to handle API requests. |
| **CORS** | Cross-Origin Resource Sharing — lets your frontend access the backend API. |
| **SentenceTransformer** | A deep learning model that turns sentences into vectors that capture meaning. |
| **Cosine Similarity** | A way to measure how similar two vectors (sentences) are. Higher means more similar. |
| **WSL** | You're running this inside Linux on Windows (WSL), and need the Windows IP to call Spring Boot. |

---

## 🧩 FULL CODE EXPLAINED LINE-BY-LINE

### 📦 Import Libraries

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests, nltk, re
from nltk.corpus import stopwords
from nltk.tokenize import wordpunct_tokenize
from sentence_transformers import SentenceTransformer, util
```
> Sets up Flask (for API), enables CORS, imports NLP and ML libraries.

### 🧠 Load NLP Stuff

```python
nltk.download('stopwords')
stop_words = set(stopwords.words("english"))
```
> Downloads stopwords (common filler words like "is", "the", "and") and prepares them.

### 🔥 Initialize the App and Model

```python
app = Flask(__name__)
CORS(app)
model = SentenceTransformer('all-MiniLM-L6-v2')
```
> Starts Flask and loads a pretrained ML model for semantic sentence comparison.

### 🌐 Function: Get Windows IP from WSL

```python
def get_windows_host_ip():
    ...
```
> WSL and Windows are separate machines — this grabs Windows IP so Flask in WSL can reach Spring Boot running in Windows.

### 🔄 Function: Fetch PG Data from `/beds`

```python
def fetch_pg_data():
    ...
    response = requests.get(f"http://{host_ip}:9000/beds")
```
> Retrieves PG data as a list of dictionaries.

### 🧹 Function: Clean + Combine PG Text

```python
def prepare_pg_text(entry):
    ...
```
> Combines fields like PG name, description, address, type, etc. into a searchable string.

### 📥 Main Route: `/search`

```python
@app.route("/search", methods=["POST"])
def search_pg():
```
> The main API endpoint where a frontend sends search queries.

---

### 💬 Step-by-step Inside `search_pg()`

1. **Get the query string** from the request body.
2. **Fetch all PG entries** from backend.
3. **Convert each PG and the query into vector format** using `model.encode(...)`.
4. **Calculate cosine similarity** between the query vector and each PG vector.
5. **Sort results from most to least similar.**
6. **Return JSON** of the PGs in that order.

---

## 📊 Example Flow

| Query | What Happens |
|-------|--------------|
| "Triple sharing PG in Hyderabad" | Query converted into vector → Compared with each PG vector → Best matching PGs returned |
| "Need a girls' PG near Salt Lake" | Similar process — PGs with relevant fields (gender, location) will rank higher |

---

## 🚀 How Can You Extend It?

- Add filtering for city/gender/type **after ranking**
- Cache embeddings for faster performance
- Add `similarity_score` in response
- Use more powerful models like `"multi-qa-MiniLM"` if needed

---

Would you like a **visual diagram** or **step-by-step user flow with code comments** next?
