# Davia Data App

A modern, responsive web application built with Davia's Python SDK for data visualization and analysis.

## Features

- Interactive data visualization dashboard
- Real-time data updates
- Responsive design for all devices
- Modern UI with intuitive controls
- Secure data handling

## Prerequisites

- Python 3.8 or higher
- pip (Python package installer)
- A Davia API key (get one at [Davia Labs](https://davialabs.com))

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/davia-dataapp.git
cd davia-dataapp
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the root directory and add your Davia API key:
```
DAVIA_API_KEY=your_api_key_here
```

## Usage

1. Start the application:
```bash
python app/main.py
```

2. Open your web browser and navigate to `http://localhost:5000`

## Project Structure

```
davia-dataapp/
├── app/                    # Application package
│   ├── main.py            # Main application file
│   ├── static/            # Static files (CSS, JS)
│   └── templates/         # HTML templates
├── tests/                 # Test files
├── .env                   # Environment variables
├── requirements.txt       # Python dependencies
└── README.md             # This file
```

## Development

- The application uses Flask as the web framework
- Davia SDK for data processing and visualization
- Bootstrap 5 for responsive design
- Custom CSS and JavaScript for enhanced interactivity

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Davia Labs](https://github.com/davialabs/davia) for their amazing SDK
- Flask team for the web framework
- Bootstrap team for the UI framework 