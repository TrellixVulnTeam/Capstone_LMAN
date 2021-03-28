/**
 * @format
 */
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import Navigation from './src/navigation/InitNavigation';
import { name as appName } from './app.json';
import { typography } from './utils/typography';

typography()

ReactNativeForegroundService.register();

ReactNativeForegroundService.start({
    id: 2212,
    title: 'Sofa',
    message: 'you are online!',
});

AppRegistry.registerComponent(appName, () => Navigation);
