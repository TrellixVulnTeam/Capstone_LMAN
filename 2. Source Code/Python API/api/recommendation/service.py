import database as database
from sklearn.metrics.pairwise import cosine_similarity
from scipy import spatial


class Service:

    @staticmethod
    def list_key(item):
        return item['score']

    @staticmethod
    def process_data(item):
        result = {
            'id': item['id'],
            'accountID': item['accountID'],
            'list': [item['height'], item['weight'], item['bustSize'], item['waistSize'], item['hipSize']],
            'skinColor': item['skinColor']
        }
        return result

    @staticmethod
    def get_similar_info(info_id):
        list_info = database.InfoDB.get_instance().get_all_info()
        query_item = None
        list_item = []
        for item in list_info:
            temp = Service.process_data(item)
            if (temp['id'] == info_id):
                query_item = temp
            else:
                list_item.append(temp)
        list_cos = []
        for item in list_item:
            temp = 1 - spatial.distance.cosine(query_item['list'], item['list'])
            data = {
                'queryID': query_item['id'],
                'itemID': item['id'],
                'score': temp * 100
            }
            if (data['score'] >= 99.85):
                list_cos.append(data)

        list_cos.sort(key=Service.list_key, reverse=True)
        response = list_cos

        return response

    @staticmethod
    def get_all_info():
        result = database.InfoDB.get_instance().get_all_info()
        return result
