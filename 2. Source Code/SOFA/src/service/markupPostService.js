import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Request from "../common/request";
import * as Const from "../common/const";
import { getData, storeData } from '../common/utils';



export const markupPost = (postID) => {
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
                    let uri = Const.domain + 'api/markup/MarkupPost?postID=' + postID;
                    Request.Get(uri, header)
                        .then(response => {
                            resolve(response);
                        })
                        .catch(reason => {
                            reject(reason);
                        })
                }
                else {
                    reject({ code: Const.REQUEST_CODE_NOT_LOGIN })
                }
            })
            .catch(reason => {
                reject(reason);
            })
    });
}
export const unmarkupPost = (postID) => {
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
                    let uri = Const.domain + 'api/markup/UnmarkupPost?postID=' + postID;
                    Request.Get(uri, header)
                        .then(response => {
                            resolve(response);
                        })
                        .catch(reason => {
                            reject(reason);
                        })
                }
                else {
                    reject({ code: Const.REQUEST_CODE_NOT_LOGIN })
                }
            })
            .catch(reason => {
                reject(reason);
            })
    });
}
export const getUserMarkupPost = (page) => {
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
                    let uri = Const.domain + 'api/markup/GetUserMarkupPost';
                    Request.Get(uri, header)
                        .then(response => {
                            resolve(response);
                        })
                        .catch(reason => {
                            reject(reason);
                        })
                }
                else {
                    reject({ code: Const.REQUEST_CODE_NOT_LOGIN })
                }
            })
            .catch(reason => {
                reject(reason);
            })
    });
}