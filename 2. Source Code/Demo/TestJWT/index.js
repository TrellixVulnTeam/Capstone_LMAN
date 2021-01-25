/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import Login from './src/components/login'
import Navigation from './src/navigation/navigation'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Navigation);
