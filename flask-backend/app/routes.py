from flask import Blueprint, request, jsonify
from .recommendation_logic import recommend_products

main = Blueprint('main', __name__)

@main.route('/recommendations', methods=['GET'])
def recommendations():
    # Extract user data from request parameters
    user_data = {
        'color': request.args.get('color', 'WHITE'),
        'brand': request.args.get('brand', 'Nike'),
        'max_price': request.args.get('max_price'),
        'age': request.args.get('age'),
        'gender': request.args.get('gender').capitalize(),
        'country': request.args.get('country'),
        'hobbies': request.args.get('hobbies'),
    }

    user_data["hobbies"] = "Travelling"

    # Ensure all required parameters are provided
    if not all(user_data.values()):
        return jsonify({"error": "Missing user data parameters"}), 400

    # Get recommendations based on user data
    recommendations = recommend_products(user_data)
    print("Recommendations:", recommendations)
    # Return recommendations as JSON
    if isinstance(recommendations, list) and all(isinstance(item, dict) for item in recommendations):
        # Return recommendations as JSON
        return jsonify(recommendations)
    else:
        # Return error response if recommendations are not in the correct format
        return jsonify({"error": "Unexpected data format for recommendations"}), 500