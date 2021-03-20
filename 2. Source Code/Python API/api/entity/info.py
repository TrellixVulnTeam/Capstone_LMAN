from multipledispatch import dispatch


class Info:
    dispatch(list)
    def __init__(self, row=[0, 0, 0, 0, 0, 0, 0, 0]):
        self.__id = row[0]
        self.__height = row[1]
        self.__weight = row[2]
        self.__account_id = row[3]
        self.__bust_size = row[4]
        self.__waist_size = row[5]
        self.__hip_size = row[6]
        self.__skin_color = row[7]

    @property
    def id(self):
        return self.__id

    @id.setter
    def id(self, value):
        self.__id = value

    @property
    def height(self):
        return self.__height

    @height.setter
    def height(self, value):
        self.__height = value

    @property
    def weight(self):
        return self.__weight

    @weight.setter
    def weight(self, value):
        self.__weight = value

    @property
    def account_id(self):
        return self.__account_id

    @account_id.setter
    def account_id(self, value):
        self.__account_id = value

    @property
    def bust_size(self):
        return self.__bust_size

    @bust_size.setter
    def bust_size(self, value):
        self.__bust_size = value

    @property
    def waist_size(self):
        return self.__waist_size

    @waist_size.setter
    def waist_size(self, value):
        self.__waist_size = value

    @property
    def hip_size(self):
        return self.__hip_size

    @hip_size.setter
    def hip_size(self, value):
        self.__hip_size = value

    @property
    def skin_color(self):
        return self.__skin_color

    @skin_color.setter
    def skin_color(self, value):
        self.__skin_color = value

    def to_json(self):
        json_str = {
            'id': self.__id,
            'accountID': self.__account_id,
            'height': self.__height,
            'weight': self.__weight,
            'bustSize': self.__bust_size,
            'waistSize': self.__waist_size,
            'hipSize': self.__hip_size,
            'skinColor': self.__skin_color,
        }
        return json_str
