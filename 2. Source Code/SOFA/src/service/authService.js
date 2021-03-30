import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Request from "../common/request";
import * as Const from "../common/const";
const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    } catch (e) {
        console.log(e);
        return null;
    }
};
const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    }
    catch (e) {
        console.log(e);
    }
}


export const getProfile = () => {
    return new Promise((resolve, reject) => {
        getData('token')
            .then(result => {
                if (result) {
                    let token = result.toString().substr(1, result.length - 2);
                    var header = {
                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        "Accept": 'application/json',
                        "Authorization": 'Bearer ' + token,
                    };
                    var uri = Const.domain + 'api/profile';
                    Request.Get(uri, header)
                        .then(response => {
                            resolve(response);
                        })
                        .catch(reason => {
                            reject(reason);
                        })
                } else {
                    reject({ code: Const.REQUEST_CODE_NOT_LOGIN })
                }
            })
            .catch(reason => {
                reject(reason);
            })
    })
}