import * as Request from "../common/request";
import * as Const from "../common/const";
import { getData } from '../common/utils';


export const getAllPublicPost = (page) => {
    return new Promise((resolve, reject) => {
        getData('token')
            .then(result => {
                var header = {
                    "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                    "Accept": 'application/json',
                };
                if (result) {
                    let token = result.toString().substr(1, result.length - 2);
                    header = {
                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        "Accept": 'application/json',
                        "Authorization": 'Bearer ' + token,
                    };
                }
                var uri = Const.domain + 'api/post?page=' + page + '&rowsOfPage=' + Const.NEWSFEED_ROWS_OF_PAGE;
                Request.Get(uri, header)
                    .then(response => {
                        resolve(response);
                    })
                    .catch(reason => {
                        reject(reason);
                    })
            })
            .catch(reason => {
                reject(reason);
            })
    })
}
export const getUserPublicPost = (accountPost, page) => {
    return new Promise((resolve, reject) => {
        var header = {
            "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
            "Accept": 'application/json',
        };
        var uri = Const.domain + 'api/post/GetUserPublicPost?accountPost=' + accountPost + '&page=' + page + '&rowsOfPage=' + Const.PROFILE_ROW_OF_PAGE;
        Request.Get(uri, header)
            .then(response => {
                resolve(response);
            })
            .catch(reason => {
                reject(reason);
            })
    });

}
export const getUserPost = (page) => {
    return new Promise((resolve, reject) => {
        getData('token')
            .then(result => {
                var header = {
                    "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                    "Accept": 'application/json',
                };
                if (result) {
                    let token = result.toString().substr(1, result.length - 2);
                    header = {
                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        "Accept": 'application/json',
                        "Authorization": 'Bearer ' + token,
                    };
                }
                var uri = Const.domain + 'api/post/GetUserPublicPost?page=' + page + '&rowsOfPage=' + Const.PROFILE_ROW_OF_PAGE;
                Request.Get(uri, header)
                    .then(response => {
                        resolve(response);
                    })
                    .catch(reason => {
                        reject(reason);
                    })
            })
            .catch(reason => {
                reject(reason);
            })
    })
}

export const likePost = (postID) => {
    return new Promise((resolve, reject) => {
        getData('token')
            .then(result => {
                if (result) {
                    let token = result.toString().substr(1, result.length - 2);

                    var header = {
                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        'Content-Type': 'multipart/form-data',
                        "Accept": 'application/json',
                        "Authorization": 'Bearer ' + token,
                    };
                    let data = new FormData();
                    data.append('PostID', postID);
                    let uri = Const.domain + 'api/post/likepost';
                    Request.Post(uri, header, data)
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
    })
}
export const unlikePost = (postID) => {
    return new Promise((resolve, reject) => {
        getData('token')
            .then(result => {
                if (result) {
                    let token = result.toString().substr(1, result.length - 2);
                    var header = {
                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        'Content-Type': 'multipart/form-data',
                        "Accept": 'application/json',
                        "Authorization": 'Bearer ' + token,
                    };
                    let data = new FormData();
                    data.append('PostID', postID);
                    let uri = Const.domain + 'api/post/unlikepost';
                    Request.Post(uri, header, data)
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
    })
}
export const ratePost = (postID, rating) => {
    return new Promise((resolve, reject) => {
        getData('token')
            .then(result => {
                if (result) {
                    let token = result.toString().substr(1, result.length - 2);
                    var header = {
                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        'Content-Type': 'multipart/form-data',
                        "Accept": 'application/json',
                        "Authorization": 'Bearer ' + token,
                    };
                    let data = new FormData();
                    data.append('PostID', postID);
                    data.append('RatePoint', rating);
                    let uri = Const.domain + 'api/post/ratepost';
                    Request.Post(uri, header, data)
                        .then(response => {
                            resolve(response);
                        })
                        .catch(reason => {
                            reject(reason);
                        })
                }
                else {
                    reject({ code: Const.REQUEST_CODE_NOT_LOGIN });
                }
            })
            .catch(reason => {
                reject(reason);
            })
    })
}
export const commentPost = (postID, comment) => {
    return new Promise((resolve, reject) => {
        getData('token')
            .then(result => {
                if (result) {
                    let token = result.toString().substr(1, result.length - 2);
                    var header = {
                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        'Content-Type': 'multipart/form-data',
                        "Accept": 'application/json',
                        "Authorization": 'Bearer ' + token,
                    };
                    let data = new FormData();
                    data.append('PostID', postID);
                    data.append('Comment', comment);
                    let uri = Const.domain + 'api/post/commentPost';
                    Request.Post(uri, header, data)
                        .then(response => {
                            resolve(response);
                        })
                        .catch(reason => {
                            reject(reason);
                        })
                }
                else {
                    reject({ code: Const.REQUEST_CODE_NOT_LOGIN });
                }
            })
            .catch(reason => {
                reject(reason);
            })
    })
}
export const createPost = (content, privacyID, listPrimaryImage, listShirtImage, listTrousersImage, listAccessoriesImage, bodyInfoID) => {
    return new Promise((resolve, reject) => {
        getData('token')
            .then(result => {
                if (result) {
                    let token = result.toString().substr(1, result.length - 2);

                    var header = {
                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        'Content-Type': 'multipart/form-data',
                        "Accept": 'application/json',
                        "Authorization": 'Bearer ' + token,
                    };
                    let data = new FormData();
                    data.append('content', content);
                    data.append('PrivacyID', privacy);
                    let count = 0;
                    for (let i = 0; i < listPrimaryImage.length; i++) {
                        data.append('ListImage[' + count + '].Image', listPrimaryImage[i].data);
                        data.append('ListImage[' + count + '].ImageType', 1);
                        count++;
                    }
                    for (let i = 0; i < listShirtImage.length; i++) {
                        data.append('ListImage[' + count + '].Image', listShirtImage[i].data);
                        data.append('ListImage[' + count + '].ImageType', 1);
                        count++;
                    }
                    for (let i = 0; i < listTrousersImage.length; i++) {
                        data.append('ListImage[' + count + '].Image', listTrousersImage[i].data);
                        data.append('ListImage[' + count + '].ImageType', 1);
                        count++;
                    }
                    for (let i = 0; i < listAccessoriesImage.length; i++) {
                        data.append('ListImage[' + count + '].Image', listAccessoriesImage[i].data);
                        data.append('ListImage[' + count + '].ImageType', 1);
                        count++;
                    }
                    data.append('BodyInfoID', bodyInfoID);
                    let uri = Const.domain + 'api/post/createpost';
                    Request.Post(uri, header, data)
                        .then(response => {
                            resolve(response);
                        })
                        .catch(reason => {
                            reject(reason);
                        })
                }
                else {
                    reject({ code: Const.REQUEST_CODE_NOT_LOGIN });
                }
            })
            .catch(reason => {
                reject(reason);
            })
    })
}

export const getPostDetail = (postID) => {
    return new Promise((resolve, reject) => {
        getData('token')
            .then(result => {
                var header = {
                    "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                    "Accept": 'application/json',
                };
                if (result) {
                    let token = result.toString().substr(1, result.length - 2);
                    header = {
                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        "Accept": 'application/json',
                        "Authorization": 'Bearer ' + token,
                    };
                }
                let uri = Const.domain + 'api/post/getPostDetail?postID=' + postID + '&commentRowsOfPage=' + Const.COMMENT_ROWS_OF_PAGE;
                Request.Get(uri, header)
                    .then(response => {
                        resolve(response);
                    })
                    .catch(reason => {
                        reject(reason);
                    })
            })
            .catch(reason => {
                reject(reason);
            })
    })
}
export const getCommentOfPost = (postID, page) => {
    return new Promise((resolve, reject) => {
        getData('token')
            .then(result => {
                var header = {
                    "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                    "Accept": 'application/json',
                };
                if (result) {
                    let token = result.toString().substr(1, result.length - 2);
                    header = {
                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        "Accept": 'application/json',
                        "Authorization": 'Bearer ' + token,
                    };
                }
                let uri = Const.domain + 'api/post/getCommentOfPost?postID=' + postID + '&page=' + page + '&rowsOfPage=' + Const.COMMENT_ROWS_OF_PAGE;
                Request.Get(uri, header)
                    .then(response => {
                        resolve(response);
                    })
                    .catch(reason => {
                        reject(reason);
                    })
            })
            .catch(reason => {
                reject(reason);
            })

    })
}

export const deletePost = (postID) => {
    return new Promise((resolve, reject) => {
        getData('token')
            .then(result => {
                if (result) {
                    let token = result.toString().substr(1, result.length - 2);
                    var header = {
                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        'Content-Type': 'multipart/form-data',
                        "Accept": 'application/json',
                        "Authorization": 'Bearer ' + token,
                    };
                    let data = new FormData();
                    data.append('PostID', postID);
                    let uri = Const.domain + 'api/post/deletepost';
                    Request.Post(uri, header, data)
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
    })
}
export const getPostRecommend = (infoID, page) => {
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
                    let uri = Const.domain + 'api/post/recommend?infoID=' + infoID + '&page=' + page + '&rowsOfPage=' + Const.NEWSFEED_ROWS_OF_PAGE;
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
    })
}
export const updatePost = (postID, content, privacyID) => {
    return new Promise((resolve, reject) => {
        getData('token')
            .then(result => {
                if (result) {
                    let token = result.toString().substr(1, result.length - 2);
                    var header = {
                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                        'Content-Type': 'multipart/form-data',
                        "Accept": 'application/json',
                        "Authorization": 'Bearer ' + token,
                    };
                    let data = new FormData();
                    data.append('PostID', postID);
                    data.append('Content', content);
                    data.append('PrivacyID', privacyID);
                    console.log(data);

                    let uri = Const.domain + 'api/post/UpdatePostContent';
                    Request.Post(uri, header, data)
                        .then(response => {
                            resolve(response);
                        })
                        .catch(reason => {
                            reject(reason);
                        })
                }
                else {
                    reject({ code: Const.REQUEST_CODE_NOT_LOGIN });
                }
            })
            .catch(reason => {
                reject(reason);
            })
    })
}
