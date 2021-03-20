from .dbcontext import DBContext
from entity import Info


class InfoDB:
    __instance = None

    @staticmethod
    def get_instance():
        if (InfoDB.__instance == None):
            InfoDB()
        return InfoDB.__instance

    def __init__(self):
        if (InfoDB.__instance == None):
            self.__connect = DBContext.getInstance().connect
            InfoDB.__instance = self

    def get_all_info(self):
        mycursor = self.__connect.cursor()
        mycursor.execute("EXEC dbo.GetAllInfo")
        row = mycursor.fetchone()
        infos = []
        while row:
            temp = Info(row)
            infos.append(temp.to_json())
            row = mycursor.fetchone()
        return infos

    def get_info_by_id(self, id):
        mycursor = self.__connect.cursor()
        mycursor.execute("EXEC dbo.GetInfoByID @id = ?", id)
        row = mycursor.fetchone()
        info = None
        while row:
            temp = Info(row)
            info = temp.to_json()
            row = mycursor.fetchone()
        return info
