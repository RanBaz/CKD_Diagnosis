from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle
import numpy as np
import logging
import traceback

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(message)s',
    filename='app.log'
)

app = Flask(__name__)
CORS(app)

# Load the trained model
try:
    with open('random_forest_model.pkl', 'rb') as file:
        model = pickle.load(file)
    logging.info("Model loaded successfully")
except Exception as e:
    logging.error(f"Error loading model: {str(e)}")
    logging.error(traceback.format_exc())

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if not request.is_json:
            logging.error(f"Invalid content type: {request.content_type}")
            return jsonify({'success': False, 'error': 'Content-Type must be application/json'}), 400

        data = request.get_json()
        logging.info(f"Received data: {data}")

        # Validate all required fields are present
        required_fields = ['age', 'bp', 'sg', 'al', 'su', 'rbc', 'pc', 'pcc', 'ba', 'bgr', 
                         'bu', 'sc', 'sod', 'pot', 'hemo', 'pcv', 'wbcc', 'rbcc', 'htn', 
                         'dm', 'cad', 'appet', 'pe', 'ane']
        
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({
                'success': False,
                'error': f'Missing required fields: {", ".join(missing_fields)}'
            }), 400

        # Create input DataFrame
        input_data = pd.DataFrame([{
            'age': float(data['age']),
            'bp': float(data['bp']),
            'sg': float(data['sg']),
            'al': int(data['al']),
            'su': int(data['su']),
            'rbc': int(data['rbc']),
            'pc': int(data['pc']),
            'pcc': int(data['pcc']),
            'ba': int(data['ba']),
            'bgr': float(data['bgr']),
            'bu': float(data['bu']),
            'sc': float(data['sc']),
            'sod': float(data['sod']),
            'pot': float(data['pot']),
            'hemo': float(data['hemo']),
            'pcv': float(data['pcv']),
            'wbcc': float(data['wbcc']),
            'rbcc': float(data['rbcc']),
            'htn': int(data['htn']),
            'dm': int(data['dm']),
            'cad': int(data['cad']),
            'appet': int(data['appet']),
            'pe': int(data['pe']),
            'ane': int(data['ane'])
        }])
        
        logging.info("Making prediction...")
        prediction = model.predict(input_data)[0]
        result = 'CKD' if prediction == 1 else 'Not CKD'
        logging.info(f"Prediction result: {result}")

        return jsonify({
            'success': True,
            'prediction': result
        })

    except Exception as e:
        logging.error(f"Error during prediction: {str(e)}")
        logging.error(traceback.format_exc())
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True)