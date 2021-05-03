import * as signalR from '@microsoft/signalr';
import * as Const from '../common/const';
import * as Utils from '../common/utils';
import PushNotification from "react-native-push-notification";
import Session from '../common/session';
import * as ProfileService from '../service/profileService';

export default class OnlineWSS {
    static instance;

    _connection = null;
    _started = false;

    static getInstance(isNewfeed) {
        if (OnlineWSS.instance == null) {
            OnlineWSS.instance = new OnlineWSS(isNewfeed);
        }
        return OnlineWSS.instance;
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
                        .withUrl(Const.domain + 'online', {
                            accessTokenFactory: () => token,
                            skipNegotiation: true,
                            transport: signalR.HttpTransportType.WebSockets
                        })
                        .withAutomaticReconnect()
                        .build();
                    this._connection.start().then(() => {
                        this._started = true;
                        console.log('Connected from OnlineWSS.js');
                    }).catch(function (err) {
                        return console.error(err.toString());
                    });
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
            console.log('Connected from Online.js');
        }).catch(function (err) {
            return console.error(err.toString());
        });
    }
}