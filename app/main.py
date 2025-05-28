import os
from flask import Flask, render_template, jsonify, request
from dotenv import load_dotenv
import davia
import pandas as pd
from datetime import datetime, timedelta

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Initialize Davia client
davia_client = davia.Client(api_key=os.getenv('DAVIA_API_KEY'))

def generate_sample_data():
    """Generate sample data for demonstration"""
    dates = pd.date_range(start='2023-01-01', end='2023-12-31', freq='D')
    data = {
        'date': dates,
        'value': [100 + i * 2 + (i % 7) * 10 for i in range(len(dates))],
        'category': ['A' if i % 3 == 0 else 'B' if i % 3 == 1 else 'C' for i in range(len(dates))]
    }
    return pd.DataFrame(data)

@app.route('/')
def index():
    """Render the main dashboard page"""
    return render_template('index.html')

@app.route('/api/data')
def get_data():
    """API endpoint to get data for visualization"""
    try:
        # In a real application, you would fetch data from Davia
        # For demonstration, we'll use sample data
        df = generate_sample_data()
        
        # Convert DataFrame to dict for JSON response
        data = {
            'dates': df['date'].dt.strftime('%Y-%m-%d').tolist(),
            'values': df['value'].tolist(),
            'categories': df['category'].tolist()
        }
        
        return jsonify({
            'status': 'success',
            'data': data
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/api/analyze', methods=['POST'])
def analyze_data():
    """API endpoint for data analysis"""
    try:
        data = request.json
        # Here you would use Davia's analysis capabilities
        # For demonstration, we'll return a simple analysis
        return jsonify({
            'status': 'success',
            'analysis': {
                'mean': sum(data['values']) / len(data['values']),
                'max': max(data['values']),
                'min': min(data['values']),
                'categories': list(set(data['categories']))
            }
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True) 