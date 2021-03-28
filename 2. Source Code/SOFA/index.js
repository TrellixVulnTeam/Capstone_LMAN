/**
 * @format
 */
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import Navigation from './src/navigation/InitNavigation';
import { name as appName } from './app.json';
import { typography } from './utils/typography';
import PushNotification from "react-native-push-notification";

typography();

PushNotification.configure({
    onRegister: function (token) {
      console.log("TOKEN:", token);
    },
    onNotification: function (notification) {
      console.log("NOTIFICATION:", notification);
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

AppRegistry.registerComponent(appName, () => Navigation);
