from flask import Flask
from flask_restful import Api
from sqlalchemy import

from post import Post

app = Flask(__name__)
api = Api(app)



if __name__ == '__main__':
    app.run()
