from .dbcontext import DBContext

class PostDB:
    __instance = None
    @staticmethod
    def getInstance():
        if(PostDB.__instance==None):
            PostDB()
        return PostDB.__instance
    def __init__(self):
        if(PostDB.__instance==None):
            self.__connect = DBContext.getInstance().connect
            PostDB.__instance = self
    def getPostByID(self, id):
        mycursor = self.__connect.cursor()
        mycursor.execute("EXEC dbo.GetAllPublicPost")
        row = mycursor.fetchone()
        while row:
            print(row)
            row = mycursor.fetchone()

