import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient';


import NewsfeedStack from './newsfeedStack';
import HotStack from './hotStack';
import SuggestStack from './suggestStack';
import CreatePostStack from './createPostStack';
import ProfileStack from './profileStack';
import { scale } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator
      initialRouteName="Newsfeed"
      tabBarOptions={{
        activeTintColor: '#c92327',
        inactiveTintColor: '#f8e5d7',
        activeBackgroundColor: 'transparent',
        inactiveBackgroundColor: 'transparent',
        height: scale(50, Vertical),
        style: {
          backgroundColor: '#8fbbc4'
        }

      }}>
      <Tab.Screen
        name="Newsfeed"
        component={NewsfeedStack}
        options={{
          title: 'Bảng tin',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="article" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Hot"
        component={HotStack}
        options={{
          title: 'Hot',
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="fire" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="createpost"
        component={CreatePostStack}
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <LinearGradient colors={['#FF3636', '#F970FE']}
              style={{
                width: scale(40, Horizontal),
                height: scale(40, Horizontal),
                alignItems: 'center',
                justifyContent: 'center',
                //marginBottom: scale(40, Vertical),
                top: scale(5, Vertical),
                borderRadius: 50,
                position: 'absolute',
                shadowColor: '#7F58FF',
                shadowRadius: 5,
                shadowOffset: { height: scale(10, Vertical) },
                shadowOpacity: 0.3,


              }}>
              <MaterialIcons name="add" color={'white'} size={scale(40, Horizontal)} />
            </LinearGradient>
          ),
        }}
      />
      <Tab.Screen
        name="Recomendation"
        component={SuggestStack}
        options={{
          title: 'Đề xuất',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="recommend" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          title: 'Tài khoản',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator >
  );
}