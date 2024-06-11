# import pandas as pd
# from sklearn.metrics.pairwise import cosine_similarity
# from sklearn.preprocessing import OneHotEncoder
# from sklearn.compose import ColumnTransformer

# products_df = pd.read_csv('app/data/model_data.csv')

# # Preprocessing pipeline for encoding categorical features
# preprocessor = ColumnTransformer(
#     transformers=[
#         ('cat', OneHotEncoder(), ['color', 'brand'])
#     ],
#     remainder='passthrough'  # Include other columns
# )

# # Fit the preprocessor on product attributes
# product_attributes = products_df[['color', 'brand']]
# preprocessor.fit(product_attributes)


# def recommend_products(user_data):
#     user_color_pref = user_data['color']
#     user_brand_pref = user_data['brand']
#     price_range = user_data['max_price']

#     # Parse the price range string
#     try:
#         min_price, max_price = [float(price.strip().replace('$', '').replace('"', '').replace("'", '')) for price in price_range.split('-')]
#     except ValueError as e:
#         return {"error": f"Invalid price range format: {e}"}, 400

#     # Filter products based on user's price range preference
#     filtered_products = products_df[(products_df['price'] >= min_price) & (products_df['price'] <= max_price)]

#     if filtered_products.empty:
#         return "No products found within the specified price range."

#     # Replace missing preferences with the most common values
#     user_color_pref = user_color_pref if user_color_pref in filtered_products['color'].values else filtered_products['color'].mode().iloc[0]
#     user_brand_pref = user_brand_pref if user_brand_pref in filtered_products['brand'].values else filtered_products['brand'].mode().iloc[0]

#     # Transform the filtered product attributes
#     filtered_product_attr_matrix = preprocessor.transform(filtered_products[['color', 'brand']])

#     # Transform the user's preferences
#     user_input_df = pd.DataFrame([{
#         'color': user_color_pref,
#         'brand': user_brand_pref
#     }])

#     user_input_matrix = preprocessor.transform(user_input_df)

#     # Compute similarity
#     similarity_scores = cosine_similarity(user_input_matrix, filtered_product_attr_matrix)

#     # Identify top 10 products
#     top_10_indices = similarity_scores[0].argsort()[-10:][::-1]
#     top_10_products = filtered_products.iloc[top_10_indices]
#     top_10_products_list = top_10_products.to_dict(orient='records')
#     return top_10_products_list

import pandas as pd
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.neighbors import NearestNeighbors
from sklearn.metrics.pairwise import cosine_similarity

# Load the user and product data
users_df = pd.read_csv('app/data/final_data.csv')
products_df = pd.read_csv('app/data/model_data.csv')

# Display the column names of each dataframe to understand their structure
print("Users Data Columns:")
print(users_df.columns)

print("\nProducts Data Columns:")
print(products_df.columns)

# Define preprocessing pipelines
user_preprocessor = ColumnTransformer(
    transformers=[
        ('cat', OneHotEncoder(), ['Gender', 'country', 'Hobbies']),
        ('num', StandardScaler(), ['Age'])
    ],
    remainder='drop'
)

product_preprocessor = ColumnTransformer(
    transformers=[
        ('cat', OneHotEncoder(), ['color', 'brand']),
        ('num', StandardScaler(), ['price'])
    ],
    remainder='drop'
)

# Fit and transform the user data
user_features = user_preprocessor.fit_transform(users_df)

# Fit and transform the product data
product_features = product_preprocessor.fit_transform(products_df[['color', 'brand', 'price']])

# Train k-NN model to find similar users
knn = NearestNeighbors(n_neighbors=5, metric='cosine')
knn.fit(user_features)

def recommend_products(user_data):
    # Preprocess the user's demographic information
    user_demo_input = pd.DataFrame([{
        'Age': user_data['age'],
        'Gender': user_data['gender'],
        'country': user_data['country'],
        'Hobbies': user_data['hobbies']
    }])
    
    user_demo_input_encoded = user_preprocessor.transform(user_demo_input)
    
    # Find 5 similar users
    distances, indices = knn.kneighbors(user_demo_input_encoded, n_neighbors=5)
    similar_users = users_df.iloc[indices[0]]
    
    # Get product IDs from the purchase history of similar users
    product_ids = []
    for history in similar_users['purchased_history']:
        if isinstance(history, str):
            # If the history is a string, attempt to extract product IDs
            product_ids.extend([pid.strip() for pid in history.strip("[]").split(",") if pid.strip().isdigit()])
    
    # Filter unique product IDs
    product_ids = list(set(product_ids))
    
    # Filter products based on these product IDs
    similar_user_products = products_df[products_df['id'].astype(str).isin(product_ids)]
    
    if similar_user_products.empty:
        return "No products found for similar users."
    
    # Replace missing preferences with the most common values
    user_color_pref = user_data['color'] if user_data['color'] in similar_user_products['color'].values else similar_user_products['color'].mode().iloc[0]
    user_brand_pref = user_data['brand'] if user_data['brand'] in similar_user_products['brand'].values else similar_user_products['brand'].mode().iloc[0]

    # Transform the filtered product attributes
    similar_user_product_attr_matrix = product_preprocessor.transform(similar_user_products[['color', 'brand', 'price']])

    # Transform the user's product preferences
    user_input_df = pd.DataFrame([{
        'color': user_color_pref,
        'brand': user_brand_pref,
        'price': 100
    }])
    user_input_matrix = product_preprocessor.transform(user_input_df)

    # Compute similarity
    similarity_scores = cosine_similarity(user_input_matrix, similar_user_product_attr_matrix)

    # Identify top 10 products
    top_10_indices = similarity_scores[0].argsort()[-10:][::-1]
    top_10_products = similar_user_products.iloc[top_10_indices]
    top_10_products_list = top_10_products.to_dict(orient='records')
    return top_10_products_list
