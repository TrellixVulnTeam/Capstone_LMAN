from multipledispatch import dispatch

class Post():
    @dispatch()
    def __init__(self):
        self.__id = 0
        self.__content = ""
        self.__privacyID = 0
        self.__time = None
        self.__accountPost = 0

    @dispatch(object)
    def __init__(self, row):
        self.__id = row[0]
        self.__content = row[1]
        self.__privacyID = row[2]
        self.__time = row[3]
        self.__accountPost = row[4]

    @property
    def id(self):
        return self.__id

    @id.setter
    def id(self, value):
        self.__id = value

    @property
    def content(self):
        return self.__content

    @content.setter
    def content(self, value):
        self.__content = value

    @property
    def privacyID(self):
        return self.__privacyID

    @privacyID.setter
    def privacyID(self, value):
        self.__privacyID = value

    @property
    def time(self):
        return self.__time

    @time.setter
    def time(self, value):
        self.__time = value

    @property
    def accountPost(self):
        return self.__accountPost

    @accountPost.setter
    def accountPost(self, value):
        self.__accountPost = value

    def to_json(self):
        json_str = {
            'id': self.__id,
            'content': self.__content,
            'privacyID': self.__privacyID,
            'time': self.__time.strftime("%Y-%m-%dT%H:%M:%S"),
            'accountPost': str(self.__accountPost)
        }
        return json_str
