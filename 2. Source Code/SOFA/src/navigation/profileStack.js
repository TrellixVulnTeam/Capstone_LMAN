import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Profile from '../component/profile';

const Stack = createStackNavigator();

export default function ProfileStack() {
    return (
        <Stack.Navigator initialRouteName='Profile' >
            <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}