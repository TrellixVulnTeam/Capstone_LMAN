import * as signalR from '@microsoft/signalr';
import * as Const from '../common/const';
import * as Utils from '../common/utils';
import PushNotification from "react-native-push-notification";
import Session from '../common/session';
import * as ProfileService from '../service/profileService';

export default class MessageWSS {
    static instance;

    _connection = null;
    _started = false;

    static getInstance(isNewfeed) {
        if (MessageWSS.instance == null) {
            MessageWSS.instance = new MessageWSS(isNewfeed);
        }
        return MessageWSS.instance;
    }

    constructor(isNewfeed) {
        this.messageConnection(isNewfeed);
    }

    messageConnection = async (isNewfeed) => {
        Utils.getData('token')
            .then(result => {
                if (result) {
                    let token = result.toString().substr(1, result.length - 2);
                    this._connection = new signalR.HubConnectionBuilder()
                        .withUrl(Const.domain + 'message', {
                            accessTokenFactory: () => token,
                            skipNegotiation: true,
                            transport: signalR.HttpTransportType.WebSockets
                        })
                        .withAutomaticReconnect()
                        .build();
                    this._connection.start().then(() => {
                        this._started = true;
                        console.log('Connected from MessageWSS.js');
                    }).catch(function (err) {
                        return console.error(err.toString());
                    });
                    if (!isNewfeed) {
                        this._connection.on("NewMessage", data => {
                            if (data) {
                                console.log('MessageWSS', data);
                                if (Session.getInstance().settings.isOnMessageNotification && Session.getInstance().currentUserChat != data.fromAccountId) {
                                    ProfileService.getOtherProfile(data.fromAccountId)
                                        .then(response => {
                                            console.log('MessageWSS', response);
                                            if (response && response.code && response.code == Const.REQUEST_CODE_SUCCESSFULLY) {
                                                PushNotification.localNotification({
                                                    channelId: 'Tin nhắn',
                                                    title: response.firstName + ' ' + response.lastName,
                                                    message: data.content,
                                                });
                                            }
                                        })
                                        .catch(reason => {

                                        })
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
}