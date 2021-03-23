import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';


import NewsfeedStack from './newsfeedStack';
import HotStack from './hotStack';
import SuggestStack from './suggestStack';
import CreatePostStack from './createPostStack';
import ProfileStack from './profileStack';
import AccountStack from './accountStack';
import { scale } from '../common/utils';
import { Horizontal, Vertical } from '../common/const';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator
      initialRouteName="NewsfeedStack"
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#d8a027',
        inactiveTintColor: '#f8e5d7',
        activeBackgroundColor: 'transparent',
        inactiveBackgroundColor: 'transparent',
        height: scale(50, Vertical),
        style: {
          backgroundColor: '#300808'
        }
      }}>
      <Tab.Screen
        name="NewsfeedStack"
        component={NewsfeedStack}
        options={{
          title: 'Bảng tin',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="news" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Hot"
        component={HotStack}
        options={{
          title: 'Hot',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="fire" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="createpost"
        component={CreatePostStack}
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            // <LinearGradient colors={['#FF3636', '#F970FE']}
            //   style={{
            //     width: scale(40, Horizontal),
            //     height: scale(40, Horizontal),
            //     alignItems: 'center',
            //     justifyContent: 'center',
            //     //marginBottom: scale(40, Vertical),
            //     top: scale(5, Vertical),
            //     borderRadius: 50,
            //     position: 'absolute',
            //     shadowColor: '#7F58FF',
            //     shadowRadius: 5,
            //     shadowOffset: { height: scale(10, Vertical) },
            //     shadowOpacity: 0.3,


            //   }}>
            <Ionicons name="add-circle-sharp" color={color} size={size} />
            // </LinearGradient>
          ),
        }}
      />
      <Tab.Screen
        name="Recomendation"
        component={SuggestStack}
        options={{
          title: 'Đề xuất',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="like1" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountStack}
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