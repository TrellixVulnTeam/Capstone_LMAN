import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Profile from '../component/profile';
import Home from "../component/home";
import UpdateProfile from "../component/updateProfile";
import ListFollower from "../component/listFollower";

const Stack = createStackNavigator();

export default function ProfileStack() {
    return (
        <Stack.Navigator initialRouteName='Profile' >
            <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name='UpdateProfile' component={UpdateProfile} options={{ headerShown: false }} />
            <Stack.Screen name='ListFollower' component={ListFollower} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}