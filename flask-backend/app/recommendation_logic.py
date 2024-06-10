import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer

products_df = pd.read_csv('app/data/model_data.csv')

# Preprocessing pipeline for encoding categorical features
preprocessor = ColumnTransformer(
    transformers=[
        ('cat', OneHotEncoder(), ['color', 'brand'])
    ],
    remainder='passthrough'  # Include other columns
)

# Fit the preprocessor on product attributes
product_attributes = products_df[['color', 'brand']]
preprocessor.fit(product_attributes)


def recommend_products(user_data):
    user_color_pref = user_data['color']
    user_brand_pref = user_data['brand']
    price_range = user_data['max_price']

    # Parse the price range string
    try:
        min_price, max_price = [float(price.strip().replace('$', '').replace('"', '').replace("'", '')) for price in price_range.split('-')]
    except ValueError as e:
        return {"error": f"Invalid price range format: {e}"}, 400

    # Filter products based on user's price range preference
    filtered_products = products_df[(products_df['price'] >= min_price) & (products_df['price'] <= max_price)]

    if filtered_products.empty:
        return "No products found within the specified price range."

    # Replace missing preferences with the most common values
    user_color_pref = user_color_pref if user_color_pref in filtered_products['color'].values else filtered_products['color'].mode().iloc[0]
    user_brand_pref = user_brand_pref if user_brand_pref in filtered_products['brand'].values else filtered_products['brand'].mode().iloc[0]

    # Transform the filtered product attributes
    filtered_product_attr_matrix = preprocessor.transform(filtered_products[['color', 'brand']])

    # Transform the user's preferences
    user_input_df = pd.DataFrame([{
        'color': user_color_pref,
        'brand': user_brand_pref
    }])

    user_input_matrix = preprocessor.transform(user_input_df)

    # Compute similarity
    similarity_scores = cosine_similarity(user_input_matrix, filtered_product_attr_matrix)

    # Identify top 10 products
    top_10_indices = similarity_scores[0].argsort()[-10:][::-1]
    top_10_products = filtered_products.iloc[top_10_indices]
    top_10_products_list = top_10_products.to_dict(orient='records')
    return top_10_products_list