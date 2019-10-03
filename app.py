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

@app.route("/nn")
def nn():
    return render_template("nn.html")

@app.route("/api/ai/<company>/<ai_id>")
def ai_get(company, ai_id):
		return ezmongo.get_data(company, ai_id).to_json(orient='records')

@app.route("/api/stock/<company>")
def company_get(company):
		return ezmongo.get_data(company,'cleaned').to_json(orient="records")

if __name__ == "__main__":
     app.run()

