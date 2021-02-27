import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'

import NewsfeedStack from './newsfeedStack';
import HotStack from './hotStack';
import SuggestStack from './suggestStack';
import NotificationStack from './notficationStack';
import ProfileStack from './profileStack';

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
      <Tab.Navigator
        initialRouteName="Newsfeed"
        tabBarOptions={{
          activeTintColor: 'red',
          activeBackgroundColor: 'white',
        }}>
        <Tab.Screen
          name="Newsfeed"
          component={NewsfeedStack}
          options={{
            title: 'Bảng tin',
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="article" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Hot"
          component={HotStack}
          options={{
            title: 'Hot',
            tabBarIcon: ({color, size}) => (
              <SimpleLineIcons name="fire" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Suggest"
          component={SuggestStack}
          options={{
            title: 'Suggest',
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="recommend" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationStack}
          options={{
            title: 'Thông báo',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="notifications" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={NotificationStack}
          options={{
            title: 'Tài khoản',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }