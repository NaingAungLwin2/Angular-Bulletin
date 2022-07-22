from distutils.log import debug
from flask import Flask
from flask import Flask, jsonify;
from flask_cors import CORS
app = Flask(__name__)

cor = CORS(app)
app.config['CORS Header'] = 'Content Type'


