from .dbcontext import DBContext
from entity import Post


class PostDB:
    __instance = None

    @staticmethod
    def getInstance():
        if (PostDB.__instance == None):
            PostDB()
        return PostDB.__instance

    def __init__(self):
        if (PostDB.__instance == None):
            self.__connect = DBContext.getInstance().connect
            PostDB.__instance = self

    def getPostByID(self, id):
        mycursor = self.__connect.cursor()
        mycursor.execute("EXEC dbo.GetAllPublicPost @page = 1, @rowsOfPage = 2")
        row = mycursor.fetchone()
        posts = []
        while row:
            temp = Post(row)
            posts.append(temp.to_json())
            row = mycursor.fetchone()
        return posts
