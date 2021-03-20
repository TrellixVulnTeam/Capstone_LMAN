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
            self.connect = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER=localhost,1433;DATABASE=CapstonesNoRelation;UID=sa;PWD=123')
            DBContext.__instance = self
    @property
    def connect(self):
        return self.__connect
    @connect.setter
    def connect(self, connect):
        self.__connect = connect