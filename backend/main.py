from flask import Flask, flash, render_template, request, send_file, session,redirect
import os, shutil
import pymysql
from db import mysql
from flask import jsonify
from app import app
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash



@app.route('/', methods=['GET'])
def hello_world():
    data = 'naingaunglwin'
    rep = jsonify(data)
    return rep

@app.route('/login', methods=['POST'])
def login():

   
        json_data = request.json
        userEmail = json_data['email']
        # userPassword = json_data['password']
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM user_table WHERE email=%s", userEmail)
        row = cursor.fetchone()
        print('+++++++++++++++++>the input Email is ', row[2])
        cursor.close()
        conn.close()
    
            
       
           
        


if __name__ == '__main__': 
    app.run(debug=True)