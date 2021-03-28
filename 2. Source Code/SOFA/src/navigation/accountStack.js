import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Profile from '../component/profile';
import Home from "../component/home";
import UpdateProfile from "../component/updateProfile";
import Account from '../component/account';

const Stack = createStackNavigator();

export default function ProfileStack() {
    return (
        <Stack.Navigator initialRouteName='Account' >
            <Stack.Screen name='Account' component={Account} options={{ headerShown: false }} />
            <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name='UpdateProfile' component={UpdateProfile} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}