/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import Navigation from './src/navigation/navigation';
import { name as appName } from './app.json';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as signalR from '@microsoft/signalr';
import * as Const from './src/common/const';
import * as Request from './src/common/request';
import PushNotification from "react-native-push-notification";

ReactNativeForegroundService.register();

ReactNativeForegroundService.start({
    id: 2212,
    title: 'VChat',
    message: 'you are online!',
});

PushNotification.configure({
    onRegister: function (token) {
        console.log("TOKEN:", token);
    },

    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },
    popInitialNotification: true,
    requestPermissions: false,
});
//PushNotification.deleteChannel('NOTFICATIONCHANEL2212');
PushNotification.channelExists('NOTFICATIONCHANEL2212', function (exists) {
    if (!exists) {
        PushNotification.createChannel(
            {
                channelId: "NOTFICATIONCHANEL2212", // (required)
                channelName: "NOTFICATIONCHANEL2212", // (required)
                channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
                playSound: true, // (optional) default: true
                soundName: "newmessage", // (optional) See `soundName` parameter of `localNotification` function
                importance: 5, // (optional) default: 4. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration patten if true.

            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
    } else {
        console.log('Channel existed!');
    }
});


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

getData('token')
    .then(result => {
        if (result && result.length > 0) {
            let token = result.toString().substr(1, result.length - 2);
            const connection = new signalR.HubConnectionBuilder()
                .withUrl(Const.domain + '/message', {
                    accessTokenFactory: () => token,
                    skipNegotiation: true,
                    transport: signalR.HttpTransportType.WebSockets
                }).build();
            connection.start().then(() => {
                console.log("Notify Connected!");
                connection.on("NewMessage", data => {
                    getData('receiverID')
                        .then(receiverID => {
                            console.log(data.senderID.toString(), receiverID);
                            if (receiverID) {
                                if (data.senderID.toString() != receiverID) {
                                    var headers = {
                                        "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                                        "Accept": 'application/json',
                                        "Authorization": 'Bearer ' + token,
                                    };
                                    Request.Get(Const.domain + '/api/account/OtherProfile?id=' + data.senderID, headers)
                                        .then(response => {
                                            if (response.code == 'SUCCESSFULLY') {
                                                setTimeout(() => PushNotification.localNotification({
                                                    channelId: "NOTFICATIONCHANEL2212", // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
                                                    title: response.firstName + ' ' + response.lastName, // (optional)
                                                    message: data.content, // (required)
                                                }), 0)
                                            }
                                        })
                                        .catch(reason => console.log(reason));


                                    console.log('Background notify', data);
                                }
                            } else {
                                console.log('Background notify', data);
                                var headers = {
                                    "User-Agent": 'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36',
                                    "Accept": 'application/json',
                                    "Authorization": 'Bearer ' + token,
                                };
                                Request.Get(Const.domain + '/api/account/otherprofile?id=' + data.senderID, headers)
                                    .then(response => {
                                        if (response.code == 'SUCCESSFULLY') {
                                            setTimeout(() => PushNotification.localNotification({
                                                channelId: "NOTFICATIONCHANEL2212", // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
                                                title: response.firstName + ' ' + response.lastName, // (optional)
                                                message: data.content, // (required)
                                                largeIconUrl: "https://049799182af0.ngrok.io/assets/Image/Message/5.png", // (optional) default: undefined

                                            }), 0)
                                        }
                                    })
                                    .catch(reason => console.log(reason));
                            }

                        })
                        .catch((reason) => {
                            console.log(reason);
                            console.log('Background notify', data);
                        })
                })
            })

        }
    })
    .catch(reason => console.log(reason));


AppRegistry.registerComponent(appName, () => Navigation);
