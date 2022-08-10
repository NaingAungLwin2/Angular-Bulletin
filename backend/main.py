from flask import Flask,request, send_file, session, redirect, Response
import os
import shutil
import pymysql
from db import mysql
from flask import jsonify
from app import app
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import os
import csv
import io
import base64
import codecs
from flask_bcrypt import Bcrypt
import shutil

allowed_extensions = ['csv']
bcrypt = Bcrypt(app)


path = os.getcwd()
next_folder = r'\frontend' + r'\src' + r'\assets'
temp_folder = r'\tmp'
to_profile = path + next_folder + temp_folder
if not os.path.exists(to_profile):
    os.mkdir(to_profile)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in allowed_extensions


@app.route('/login', methods=['POST'])
def login():

    json_data = request.json
    userEmail = json_data['email']
    userPassword = json_data['password']
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM user_table WHERE email=%s", userEmail)
    row = cursor.fetchone()

    if(row and bcrypt.check_password_hash(row[3], userPassword)):
        role = row[5]
        status = True
        userId = row[0]
        global editUserId
        global editRole
        editRole = role
        editUserId = userId
        

        data = [status, role, userId]
    else:
        role = row[5]
        status = False
        data = [status, role]

    return jsonify(data)
    


@app.route('/userlists', methods=['GET'])
def userslists():

    try:
        global editUserId
        
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT id, name, email,address,phone,dob,create_user_id,created_at,updated_at FROM user_table ORDER BY id DESC")
        rows = cursor.fetchall()
        resp = jsonify(rows)
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@app.route('/userdetail/<int:id>', methods=['GET'])
def userdetail(id):

    try:

        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM user_table WHERE id=%s", id)
        rows = cursor.fetchone()
        resp = jsonify(rows)
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@app.route('/create', methods=['POST'])
def user_create():

    _json = request.json
    _name = _json['name']
    _email = _json['email']
    _password = _json['password']
    _dob = _json['dob']
    _profile = _json['profile']

    _phone = _json['phone']
    _address = _json['address']
    _select = _json['type']
    _create_user_id = _json['ownerid']
    _updated_user_id = _json['ownerid']

    today = datetime.today()
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM user_table")
    rows = cursor.fetchall()
    last_row = rows[len(rows)-1]
    _id = last_row[0] + 1
    id_folder = r'\{}'.format(_id)
   

    if (_profile):
        def convert_and_save(b64_string):
            b64_string += '=' * (-len(b64_string) % 4)  
            to_save_profile = to_profile + id_folder
            if not os.path.exists(to_save_profile):
                os.mkdir(to_save_profile)
            with open(to_save_profile + "/{}.png".format(_id), "wb") as fh:
                fh.write(base64.decodebytes(b64_string.encode()))
        convert_and_save(_profile)
        _to_save_profile = temp_folder + id_folder + r'\{}.png'.format(_id)

    else:
        _to_save_profile = 'No profile.'

    if _id and _name and _email and _password and _to_save_profile and _phone and _address and _select and _dob and _create_user_id and _updated_user_id and request.method == 'POST':
        _hashed_password = bcrypt.generate_password_hash(_password)
        sql = "INSERT INTO user_table(id,name, email, password,profile,type,phone,address,dob,create_user_id,updated_user_id,created_at,updated_at) VALUES(%s,%s, %s, %s,%s, %s,%s,%s,%s,%s,%s,%s,%s)"
        data = (_id, _name, _email, _hashed_password, _to_save_profile, _select, _phone,_address, _dob, _create_user_id, _updated_user_id, today, today)
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute(sql, data)
        conn.commit()
        resp = jsonify('User added successfully!')
        resp.status_code = 200
        return resp
    else:
        return False


@app.route('/user/<int:id>')
def user(id):
    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute(
            "SELECT  id, name, email, password,type,phone,address FROM user_table WHERE id=%s", id)
        row = cursor.fetchone()
        resp = jsonify(row)
        resp.status_code = 200
        
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@app.route('/checkEmail', methods=['POST'])
def checkEmail():
    if request.method == 'POST':
        try:
            json_data = request.json
            userEmail = json_data['email']
            isUpdate = json_data['isUpdate']
            updateId = json_data['updateId']
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            cursor.execute("SELECT email FROM user_table")
            rows = cursor.fetchall()

            if isUpdate == True:
                
                cursor.execute("SELECT * FROM user_table WHERE id=%s", updateId)
                update_row = cursor.fetchone()
                for row in rows:
                    
                    if userEmail == update_row['email']:
                        sameEmail = False
                        return jsonify(sameEmail)
            for row in rows:
                
                if userEmail == row['email']:
                    sameEmail = True
                    return jsonify(sameEmail)
            sameEmail = False
            return jsonify(sameEmail)
        except Exception as e:
            print(e)
        finally:
            cursor.close()
            conn.close()


@app.route('/passwordreset', methods=['PUT'])
def passwordreset():
    _json = request.json
    _id = _json['id']
    _password = _json['password']
    

    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM user_table")
    cursor.fetchall()

    if _password and request.method == 'PUT':
        _hashed_password = bcrypt.generate_password_hash(_password)
        

        sql = "UPDATE user_table SET password=%s WHERE id=%s"
        data = (_hashed_password, _id)
        
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute(sql, data)
        conn.commit()
        resp = jsonify('updated successfully!')
       
        return resp
    else:
        return False


@app.route('/update', methods=['PUT'])
def edit_user():
    _json = request.json
    _id = _json['id']
    _name = _json['name']
    _email = _json['email']
    _updated_user_id = _json['ownerid']
    _dob = _json['dob']
    today = datetime.today()
    _phone = _json['phone']
    _address = _json['address']
    _select = _json['type']
    _profile = _json['profile']

    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM user_table")
    cursor.fetchall()

    id_folder = r'\{}'.format(_id)
    if (_profile):
        def convert_and_save(b64_string):
            b64_string += '=' * (-len(b64_string) % 4)  
            to_save_profile = to_profile + id_folder
            if not os.path.exists(to_save_profile):
                os.mkdir(to_save_profile)
            with open(to_save_profile + "/{}.png".format(_id), "wb") as fh:
                fh.write(base64.decodebytes(b64_string.encode()))
        convert_and_save(_profile)
        _to_save_profile = temp_folder + id_folder + r'\{}.png'.format(_id)

    else:
        _to_save_profile = 'No profile.'


    if request.method == 'PUT':

        sql = "UPDATE user_table SET name=%s,email=%s,profile=%s,phone=%s,address=%s,type=%s,dob=%s,updated_user_id=%s,updated_at=%s WHERE id=%s;"
        data = (_name, _email, _to_save_profile, _phone, _address,_select, _dob, _updated_user_id, today, _id)
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute(sql, data)
        conn.commit()
        resp = jsonify('User updated successfully!')
        return resp
    else:
        return False


@app.route('/delete/<int:id>', methods=['GET'])
def delete(id):
    

    try:
        
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM user_table WHERE id=%s", (id))
        conn.commit()
        to_profile = path + next_folder + temp_folder + r'\{}'.format(id)
        shutil.rmtree(to_profile)
        resp = jsonify('User deleted successfully!')
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@app.route('/search', methods=['POST'])
def search():
    try:
        json_data = request.json
        userEmail = json_data['email']
        userName = json_data['name']
        userDob = json_data['dob']
        searchCount = 0
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        query = 'SELECT * FROM user_table WHERE '
        if (userName):
            searchCount += 1
            query += ' name like "' + userName + '%"' + 'ORDER BY created_at DESC'
        elif(userEmail and searchCount > 0):
            query += ' AND email like "' + userEmail + '%"'
        elif(userEmail and searchCount == 0):
            query += ' email like "' + userEmail + '%"'
        elif(userDob and searchCount > 0):
            query += ' AND dob like "' + userDob + '%"'
        elif (userDob and searchCount == 0):
            query += ' dob like "' + userDob + '%"'

        cursor.execute(query)
        rows = cursor.fetchall()
        resp = jsonify(rows)
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@app.route('/postlists', methods=['GET'])
def post_lists():
    try:
    
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        if editRole == '0':
            cursor.execute("SELECT * FROM post_table ORDER BY FIELD(create_user_id, %s) DESC", editUserId)
        else:
            cursor.execute("SELECT * FROM post_table ORDER BY id DESC")
        rows = cursor.fetchall()
        resp = jsonify(rows)
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@app.route('/postdelete/<int:id>', methods=['GET'])
def postdelete(id):
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM post_table WHERE id=%s", (id))
        conn.commit()
        resp = jsonify('Post deleted successfully!')
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@app.route('/postcreate', methods=['POST'])
def postcreate():

    _json = request.json
    _title = _json['title']
    _description = _json['description']
    _status = _json['status']
    _create_user_id = _json['ownerid']
    _updated_user_id = _json['ownerid']
    today = datetime.today()
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM post_table")
    rows = cursor.fetchall()
    if rows:
        last_row = rows[len(rows)-1]
        _id = last_row[0] + 1
    else:
        _id = 1

    if _id and _title and _description and _status and today and _create_user_id and request.method == 'POST':

        sql = "INSERT INTO post_table(id,title,description,status,create_user_id,updated_user_id,created_at,updated_at)VALUES(%s,%s,%s,%s,%s,%s,%s,%s)"
        data = (_id, _title, _description, _status,_create_user_id, _updated_user_id, today, today)
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute(sql, data)
        conn.commit()
        resp = jsonify('Post added successfully!')

        resp.status_code = 200
        return resp
    else:
        return False




@app.route('/checkpost', methods=['POST'])
def checkpost():
    if request.method == 'POST':
        try:
            json_data = request.json
            userPost = json_data['title']
            isUpdate = json_data['isUpdate']
            updateId = json_data['updateId']
            conn = mysql.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            cursor.execute("SELECT title FROM post_table")
            rows = cursor.fetchall()

            if isUpdate == True:
                
                cursor.execute("SELECT * FROM post_table WHERE id=%s", updateId)
                update_row = cursor.fetchone()
                for row in rows:
                    
                    if userPost == update_row['title']:
                        samePost = False
                        return jsonify(samePost)
            
            for row in rows:
                if userPost == row['title']:
                    samePost = True
                    return jsonify(samePost)
                else:
                    samePost = False
                    
            if not rows:
                samePost= False
                return jsonify(samePost)
            return jsonify(samePost)
        except Exception as e:
            print(e)
        finally:
            cursor.close()
            conn.close()


@app.route('/postupdate', methods=['PUT'])
def postupdate():
    _json = request.json
    _id = _json['id']
    _title = _json['title']
    _description = _json['description']
    _status = _json['status']
    today = datetime.today()
    conn = mysql.connect()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM user_table")
    cursor.fetchall()

    if _id and _title and _description and _status and today and request.method == 'PUT':
        sql = "UPDATE post_table SET title=%s, description=%s,status=%s,updated_at=%s WHERE id=%s"
        data = (_title, _description, _status, today, _id)
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute(sql, data)
        conn.commit()
        resp = jsonify('Post updated successfully!')
        return resp
    else:
        return False


@app.route('/postdetail/<int:id>', methods=['GET'])
def postdetail(id):

    try:

        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM post_table WHERE id=%s", id)
        rows = cursor.fetchone()
        resp = jsonify(rows)
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@app.route('/csvupload', methods=['POST'])
def csvupload():
    try:

        formData = []
        global editUserId
        if request.method == "POST":

            _upload_file = request.files['file']
            csv_data = csv.reader(codecs.iterdecode(_upload_file, 'utf-8'))
            next(csv_data, None)
            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM post_table")
            checkrow = cursor.fetchall()

            
        postlist = []
        for row in csv_data:
            
            for csv_check in checkrow:
                if csv_check[1] == row[0]:
                    sameTitle = 1
                    return jsonify(sameTitle)
            postlist.append(row)
       
        for item in postlist:

            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM post_table")
            rows = cursor.fetchall()
            last_row = rows[len(rows)-1]
            _id = last_row[0] + 1
            _created_user_id = editUserId
            _updated_user_id = editUserId
            today = datetime.today()

            sql = "INSERT INTO post_table(id,title,description,create_user_id,updated_user_id,created_at,updated_at)VALUES(%s,%s,%s,%s,%s,%s,%s)"
            formData = (_id, item[0], item[1], _created_user_id,_updated_user_id, today, today)
            conn = mysql.connect()
            cursor = conn.cursor()
            cursor.execute(sql, formData)
            conn.commit()

        resp = jsonify('CSV upload successfully!')
        resp.status_code = 200

        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@app.route('/searchpost', methods=['POST'])
def searchpost():
    try:
        json_data = request.json
        postTitle = json_data['title']
        postDescription = json_data['description']
        searchCount = 0
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        query = 'SELECT * FROM post_table WHERE '
        if (postTitle):
            searchCount += 1
            query += ' title like "%' + postTitle + '%"' + 'ORDER BY id DESC'
        elif(postDescription and searchCount > 0):
            query += ' AND description like "%' + postDescription + '%"'
        elif(postDescription and searchCount == 0):
            query += ' description like "%' + postDescription + '%"'
        cursor.execute(query)
        rows = cursor.fetchall()
        resp = jsonify(rows)
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@app.route('/downloadcsv', methods=['GET'])
def downloadcsv():

    try:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT title,description FROM post_table")
        rows = cursor.fetchall()
        resp = jsonify(rows)
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


if __name__ == '__main__':
    app.run(debug=True)
