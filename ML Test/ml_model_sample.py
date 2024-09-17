import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neighbors import NearestNeighbors

users = pd.read_sql('SELECT * FROM users', connection)
properties = pd.read_sql('SELECT * FROM properties', connection)
properties_visited = pd.read_sql('SELECT * FROM properties_visited_by_user', connection)

user_item_matrix = properties_visited.pivot(index='user_id', columns='property_id', values='visit_id')
user_item_matrix = user_item_matrix.fillna(0)  # Fill missing values with 0, meaning no visit

user_item_matrix[user_item_matrix > 0] = 1

train_data, test_data = train_test_split(user_item_matrix, test_size=0.2, random_state=42)

knn_model = NearestNeighbors(metric='cosine', algorithm='brute')
knn_model.fit(train_data)

def get_similar_users(new_user_searches):
    distances, indices = knn_model.kneighbors([new_user_searches], n_neighbors=5)
    return indices


def recommend_properties(new_user_searches, user_item_matrix, top_n=5):
    similar_users = get_similar_users(new_user_searches)

    # Get the properties visited by similar users
    similar_users_data = user_item_matrix.iloc[similar_users[0]]

    # Sum up the visits of each property by similar users
    property_recommendations = similar_users_data.sum(axis=0).sort_values(ascending=False)

    # Recommend the top N properties that the new user hasn't visited
    recommended_properties = property_recommendations.index[:top_n]
    return properties.loc[properties['property_id'].isin(recommended_properties)]

new_user_searches = [1, 1, 0, 1, 0, 1, 0, 0, 1, 0]  # Example: Binary vector for 5 searches

# Get recommended properties
recommended_properties = recommend_properties(new_user_searches, user_item_matrix)

print("Recommended Properties for the New User:")
print(recommended_properties)
