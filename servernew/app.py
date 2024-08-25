from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/bfhl', methods=['GET', 'POST'])
def handle_request():
    if request.method == 'GET':
        # Handle GET request
        return jsonify({"operation_code": 1})

    elif request.method == 'POST':
        # Handle POST request
        data = request.get_json()
        if not data or 'data' not in data:
            return jsonify({"error": "Invalid input"}), 400
        
        input_data = data['data']
        numbers = [item for item in input_data if item.isdigit()]
        alphabets = [item for item in input_data if item.isalpha()]
        lowercase_alphabets = [item for item in alphabets if item.islower()]

        response = {
            "is_success": True,
            "user_id": "NandhuKDevadas_24112001",
            "email": "nandhu..",
            "roll_number": "21BCE1780",
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": sorted(lowercase_alphabets)[-1:] if lowercase_alphabets else []
        }

        return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
