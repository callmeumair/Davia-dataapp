from http.server import BaseHTTPRequestHandler
import json
import os
import pandas as pd
from datetime import datetime, timedelta
import davia

def generate_sample_data():
    """Generate sample data for demonstration"""
    dates = pd.date_range(start='2023-01-01', end='2023-12-31', freq='D')
    data = {
        'date': dates,
        'value': [100 + i * 2 + (i % 7) * 10 for i in range(len(dates))],
        'category': ['A' if i % 3 == 0 else 'B' if i % 3 == 1 else 'C' for i in range(len(dates))]
    }
    return pd.DataFrame(data)

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            # Initialize Davia client (in production, use environment variables)
            davia_client = davia.Client(api_key=os.getenv('DAVIA_API_KEY', 'demo_key'))
            
            # Generate sample data
            df = generate_sample_data()
            
            # Convert DataFrame to dict for JSON response
            data = {
                'dates': df['date'].dt.strftime('%Y-%m-%d').tolist(),
                'values': df['value'].tolist(),
                'categories': df['category'].tolist()
            }
            
            # Set response headers
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            # Send response
            response = {
                'status': 'success',
                'data': data
            }
            self.wfile.write(json.dumps(response).encode())
            
        except Exception as e:
            # Handle errors
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            error_response = {
                'status': 'error',
                'message': str(e)
            }
            self.wfile.write(json.dumps(error_response).encode())
    
    def do_OPTIONS(self):
        # Handle CORS preflight requests
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers() 