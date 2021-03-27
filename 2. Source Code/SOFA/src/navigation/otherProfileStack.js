import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Profile from '../component/profile';
import Home from "../component/home";
import UpdateProfile from "../component/updateProfile";
import OtherProfile from "../component/otherProfile";
import Conversation from '../component/conversation';

const Stack = createStackNavigator();

export default function OtherProfileStack() {
    return (
        <Stack.Navigator initialRouteName='OtherProfile' >
            <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name='UpdateProfile' component={UpdateProfile} options={{ headerShown: false }} />
            <Stack.Screen name='Conversation' component={Conversation} options={{ headerShown: false}} />
        </Stack.Navigator>
    )
}