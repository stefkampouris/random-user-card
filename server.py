from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

RANDOM_USER_API_BASE_URL = os.getenv('RANDOM_USER_API_URL', 'https://randomuser.me/api/')
PORT = int(os.getenv('PORT', 5000))

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/user')
def get_user():
    # Get gender from query parameter, if provided
    gender = request.args.get('gender')
    
    # Prepare the API parameters
    params = {}
    if gender in ['male', 'female']:
        params['gender'] = gender
        
    try:
        # Make request to Random User API
        response = requests.get(RANDOM_USER_API_BASE_URL, params=params)
        response.raise_for_status()  # Raise exception for bad status codes
        
        # Extract the user data
        data = response.json()
        user = data['results'][0]
        
        return jsonify(user)
        
    except requests.RequestException as e:
        return jsonify({
            'error': 'Failed to fetch user data',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=PORT) 