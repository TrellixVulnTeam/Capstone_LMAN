import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Notification from '../component/notification';

const Stack = createStackNavigator();

export default function NotificationStack() {
    return (
        <Stack.Navigator initialRouteName='Notification' >
            <Stack.Screen name='Notification' component={Notification} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}