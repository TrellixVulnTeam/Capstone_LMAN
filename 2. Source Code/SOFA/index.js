/**
 * @format
 */
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import 'react-native-gesture-handler';
import { AppRegistry, PermissionsAndroid } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import Navigation from './src/navigation/InitNavigation';
import { name as appName } from './app.json';
import { typography } from './utils/typography';
import PushNotification from 'react-native-push-notification';
import NotificationWSS from './src/service/NotificationWSS';
import MessageWSS from './src/service/messageWSS';
import { getData, requestPermission, storeData } from './src/common/utils';

import Session from './src/common/session';

typography();

requestPermission(PermissionsAndroid.PERMISSIONS.CAMERA);
requestPermission(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
requestPermission(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);

getData('settings')
    .then(result => {
        if (result) {
            let temp = JSON.parse(result);
            Session.getInstance().settings = temp;
        }
    })
    .catch(reason => {
        console.log(reason);
    });
storeData('settings', { chatColor: '#46AA4A' })
    .then(result => {
        console.log(result);
    })
    .catch(reason => console.log(reason));

PushNotification.configure({
    onRegister: function (token) {
        console.log('TOKEN:', token);
    },
    onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        //notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    popInitialNotification: true,
    requestPermissions: false,
});

ReactNativeForegroundService.register();

ReactNativeForegroundService.start({
    id: 2212,
    title: 'Sofa',
    message: 'you are online!',
});

//PushNotification.deleteChannel('NOTFICATIONCHANEL2212');
PushNotification.channelExists('Thông báo', function (exists) {
    if (!exists) {
        PushNotification.createChannel(
            {
                channelId: 'Thông báo', // (required)
                channelName: 'Thông báo', // (required)
                channelDescription: 'Thông báo các sự kiện của bạn', // (optional) default: undefined.
                playSound: true, // (optional) default: true
                // soundName: "newmessage", // (optional) See `soundName` parameter of `localNotification` function
                importance: 5, // (optional) default: 4. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            },
            (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
        );
    } else {
        console.log('Channel existed!');
    }
});
PushNotification.channelExists('Tin nhắn', function (exists) {
    if (!exists) {
        PushNotification.createChannel(
            {
                channelId: 'Tin nhắn', // (required)
                channelName: 'Tin nhắn', // (required)
                channelDescription: 'Thông báo tin nhắn đến của bạn', // (optional) default: undefined.
                playSound: true, // (optional) default: true
                // soundName: "newmessage", // (optional) See `soundName` parameter of `localNotification` function
                importance: 5, // (optional) default: 4. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            },
            (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
        );
    } else {
        console.log('Channel existed!');
    }
});

NotificationWSS.getInstance(false);
MessageWSS.getInstance(false);

AppRegistry.registerComponent(appName, () => Navigation);
