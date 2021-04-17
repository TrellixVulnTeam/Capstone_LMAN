import * as Request from "../common/request";
import * as Const from "../common/const";
import { getData } from '../common/utils';

export const getMessageByUID = (uid2, page) => {
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
                    var uri = Const.domain + 'api/message/getmessagebyuid?uid2=' + uid2 + '&page=' + page + '&rowsOfPage=' + Const.MESSAGE_ROWS_OF_PAGE;
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

export const sendMessage = (toAccountId, content, imageBase64, conversationId) => {
    return new Promise((resolve, reject) => {
        getData('token')
            .then(result => {
                if (result) {
                    let token = result.toString().substr(1, result.length - 2);
                    var header = {
                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        "Content-Type": "multipart/form-data",
                        "Host": "chientranhvietnam.org",
                        "Accept": 'application/json',
                        "Authorization": 'Bearer ' + token,
                    };
                    let data = new FormData();
                    data.append('toAccountId', toAccountId);
                    data.append('content', content);
                    data.append('senderDeleted', false);
                    data.append('receiverDeleted', false);
                    data.append('isRead', false);
                    data.append('conversationId', conversationId);
                    data.append('imageBase64', imageBase64);
                    let url = Const.domain + 'api/message/sendmessage';
                    Request.Post(url, header, data)
                        .then(response => {
                            resolve(response);
                        })
                        .catch(reason => {
                            reject(reason);
                        });

                } else {
                    reject({ code: Const.REQUEST_CODE_NOT_LOGIN })
                }
            })
            .catch(reason => {
                reject(reason);
            })
    })
}

export const getNumberUnreadMessage = () => {
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
                    var uri = Const.domain + 'api/conversation/getnumberunreadmessage';
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
export const markConversationIsReaded = (fromAccount) => {
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
                    var uri = Const.domain + 'api/conversation/MarkConversationIsReaded?fromAccount=' + fromAccount;
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
export const markMessageIsReaded = (messageID) => {
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
                    var uri = Const.domain + 'api/conversation/MarkMessageIsReaded?messageID=' + messageID;
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
export const getListCoversation = (messageID) => {
    return new Promise((resolve, reject) => {
        getData('token')
            .then(result => {
                if (result) {
                    let token = result.toString().substr(1, result.length - 2);
                    var header = {
                        'User-Agent': 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    };
                    let url = Const.domain + 'api/Conversation';
                    Request.Get(url, header)
                        .then((response) => {
                            resolve(response);
                        })
                        .catch((reason) => {
                            reject(reason);
                        });
                } else {
                    reject({ code: Const.REQUEST_CODE_NOT_LOGIN })
                }
            })
            .catch(reason => {
                reject(reason);
            })
    })
}
export const deleteConversation = (chatWithAccountId) => {
    return new Promise((resolve, reject) => {
        getData('token')
            .then(result => {
                if (result) {
                    let token = result.toString().substr(1, result.length - 2);
                    var header = {
                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        "Content-Type": "multipart/form-data",
                        "Host": "chientranhvietnam.org",
                        "Accept": 'application/json',
                        "Authorization": 'Bearer ' + token,
                    };
                    let data = new FormData();
                    let url = Const.domain + 'api/Conversation/deleteConversation';
                    data.append('AccountId', chatWithAccountId);
                    Request.Post(url, header, data)
                        .then(response => {
                            resolve(response);
                        })
                        .catch(reason => {
                            reject(reason);
                        });
                } else {
                    reject({ code: Const.REQUEST_CODE_NOT_LOGIN })
                }
            })
            .catch(reason => {
                reject(reason);
            })
    })
}