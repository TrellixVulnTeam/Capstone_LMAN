import database as database
from scipy import spatial


class Service:

    @staticmethod
    def list_key(item):
        return item['score']

    @staticmethod
    def process_data(item, query_item):
        print(query_item)
        listMeasure = [item['height'], item['weight']]
        if(query_item['bustSize'] > 0):
            listMeasure.append(item['bustSize'])
        if(query_item['waistSize'] > 0):
            listMeasure.append(item['waistSize'])
        if(query_item['hipSize'] > 0):
            listMeasure.append(item['hipSize'])
        result = {
            'id': item['id'],
            'accountID': item['accountID'],
            'list': listMeasure,
            'skinColor': item['skinColor']
        }
        return result

    @staticmethod
    def get_similar_info(info_id):
        list_info = database.InfoDB.get_instance().get_all_info()
        query_item = database.InfoDB.get_instance().get_info_by_id(info_id)
        response = {}
        if(query_item != None):
            list_item = []
            for item in list_info:
                temp = Service.process_data(item, query_item)
                if (temp['id'] != info_id):
                    list_item.append(temp)
            query_item = Service.process_data(query_item, query_item)
            list_cos = []
            for item in list_item:
                temp = 1 - \
                    spatial.distance.cosine(query_item['list'], item['list'])
                data = {
                    'queryID': query_item['id'],
                    'itemID': item['id'],
                    'score': temp * 100
                }
                if (data['score'] >= 99.85):
                    list_cos.append(data)

            list_cos.sort(key=Service.list_key, reverse=True)
            response = list_cos
        else:
            response = {'code': 'FAILED'}
        return response

    @staticmethod
    def get_all_info():
        result = database.InfoDB.get_instance().get_all_info()
        return result
