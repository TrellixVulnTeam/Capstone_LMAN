import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Message from '../component/message';

const Stack = createStackNavigator();

export default function MessageStack() {
    return (
        <Stack.Navigator initialRouteName='Message' >
            <Stack.Screen name='Message' component={Message} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}