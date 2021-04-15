import * as Request from "../common/request";
import * as Const from "../common/const";
import { getData } from '../common/utils';

export const getAllReason = () => {
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
                    let uri = Const.domain + 'api/report/getallreason';
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

export const createReport = (toAccount, toPost, toComment, typeReport, reportContent, reasons) => {
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
                    let formdata = new FormData();
                    formdata.append("ToAccount", toAccount);
                    formdata.append("ToPost", toPost);
                    formdata.append("ToComment", toComment);
                    formdata.append("TypeReport", typeReport);
                    formdata.append("ReportContent", reportContent);

                    let count = 0;
                    for (let i = 0; i < reasons.length; i++) {
                        if (reasons[i].isSelect) {
                            formdata.append('ListReason[' + count + ']', reasons[i].id);
                            count++;
                        }
                    }
                    let uri = Const.domain + 'api/report/createReport';
                    Request.Post(uri, header, formdata)
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
