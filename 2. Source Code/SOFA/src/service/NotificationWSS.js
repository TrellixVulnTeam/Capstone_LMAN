import * as signalR from '@microsoft/signalr';
import * as Const from '../common/const';
import * as Utils from '../common/utils';
import * as Message from '../common/message';
import PushNotification from "react-native-push-notification";
import Session from '../common/session';

export default class NotificationWSS {
    static instance;

    _connection = null;
    _started = false;

    static getInstance(isNewfeed) {
        if (NotificationWSS.instance == null) {
            NotificationWSS.instance = new NotificationWSS(isNewfeed);
        }
        return NotificationWSS.instance;
    }

    constructor(isNewfeed) {
        this.notificationConnection(isNewfeed);
    }

    notificationConnection = async (isNewfeed) => {
        Utils.getData('token')
            .then(result => {
                if (result) {
                    let token = result.toString().substr(1, result.length - 2);
                    this._connection = new signalR.HubConnectionBuilder()
                        .withUrl(Const.domain + 'notification', {
                            accessTokenFactory: () => token,
                            skipNegotiation: true,
                            transport: signalR.HttpTransportType.WebSockets
                        })
                        .withAutomaticReconnect()
                        .build();
                    this._connection.start().then(() => {
                        this._started = true;
                        console.log('Connected from NotificationWSS.js');
                    }).catch(function (err) {
                        return console.error(err.toString());
                    });
                    if (!isNewfeed) {
                        this._connection.on("NewNotification", data => {
                            if (data) {
                                if (Session.getInstance().account.accountID != data.fromAccount) {
                                    PushNotification.localNotification({
                                        channelId: 'Thông báo',
                                        title: "Thông báo",
                                        message: data.fromAccountName + ' ' + data.content,
                                    });
                                }
                            }
                        });
                    }
                }
            })
            .catch(reason => {
                console.log(reason);
            })

    }

    getConnection() {
        return this._connection;
    }
    setConnection(connection) {
        this._connection = connection;
    }
    isStarted() {
        return this._started;
    }
    setStarted(started) {
        this._started = started;
    }

    pushNotification() {
        if (this._started) {
            this._connection.stop();
        }
        this._connection.start().then(() => {
            this._started = true;
            console.log('Connected from NotificationWSS.js');
        }).catch(function (err) {
            return console.error(err.toString());
        });
        this._connection.on("NewNotification", data => {
            if (data) {
                PushNotification.localNotification({
                    channelId: 'Thông báo',
                    title: "Thông báo",
                    message: data.fromAccountName + ' ' + data.content,
                });
            }
        });
    }

}