/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import Navigation from './src/navigation/InitNavigation';
import { name as appName } from './app.json';
import { typography } from './utils/typography';

typography()

AppRegistry.registerComponent(appName, () => Navigation);
