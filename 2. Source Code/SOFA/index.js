/**
 * @format
 */
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import Navigation from './src/navigation/InitNavigation';
import {name as appName} from './app.json';
import {typography} from './utils/typography';
import PushNotification from 'react-native-push-notification';
import NotificationWSS from './src/service/NotificationWSS';
import MessageWSS from './src/service/messageWSS';

typography();

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
