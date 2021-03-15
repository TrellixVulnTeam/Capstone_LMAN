from database import PostDB
from flask_restful import Resource
from flask_jsonpify import jsonify


class Post(Resource):
    def get(self):
        result = PostDB.getInstance().getPostByID(6)
        return (result)
