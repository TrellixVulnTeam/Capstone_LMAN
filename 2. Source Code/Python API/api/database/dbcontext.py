import os
import pyodbc
basedir = os.path.abspath(os.path.dirname(__file__))

class DBContext:
    __instance = None

    @staticmethod
    def getInstance():
        if (DBContext.__instance == None):
            DBContext()
        return DBContext.__instance

    def __init__(self):
        if(DBContext.__instance == None):
            self.connect = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=198.13.50.243,1433;DATABASE=CapstonesNoRelation;UID=sa;PWD=@Codera3k48')
            DBContext.__instance = self
    @property
    def connect(self):
        return self.__connect
    @connect.setter
    def connect(self, connect):
        self.__connect = connect