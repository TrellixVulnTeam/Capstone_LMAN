import * as signalR from '@microsoft/signalr';
import * as Const from '../common/const';
import * as Utils from '../common/utils';
import * as Message from '../common/message';

export default class NotificationWSS {
    static instance;

    _connection = null;
    _started = false;

    static getInstance() {
        if (NotificationWSS.instance == null) {
            NotificationWSS.instance = new NotificationWSS();
        }
        return NotificationWSS.instance;
    }

    constructor() {
        this.notificationConnection();
    }

    notificationConnection() {
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
                        .build();
                    this._connection.start().then(() => {
                        this._started = true;
                        console.log('Connected');
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

}