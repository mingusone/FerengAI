import os

import pandas as pd
import numpy as np

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
import ezmongo

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/ai/<company>")
def ai_get(company):
		return ezmongo.get_data(company, 'AI').to_json(orient='records')

@app.route("/api/stock/<company>")
def company_get(company):
		return ezmongo.get_data(company,'cleaned').to_json(orient="records")

if __name__ == "__main__":
     app.run()

