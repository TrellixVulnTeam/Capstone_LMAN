from multipledispatch import dispatch


class Image:
    @dispatch()
    def __init__(self):
        self.__id = 0
        self.__postID = 0
        self.__url = ''

    @dispatch(object)
    def __init__(self, row):
        self.__id = row[0]
        self.__postID = row[1]
        self.__url = row[2]

    @property
    def id(self):
        return self.__id

    @id.setter
    def id(self, value):
        self.__id = value

    @property
    def postID(self):
        return self.__postID

    @postID.setter
    def postID(self, value):
        self.__postID = value

    @property
    def url(self):
        return self.__url

    @url.setter
    def url(self, value):
        self.__url = value
