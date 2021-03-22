import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Newsfeed from '../component/newsfeed';
import Comment from '../component/comment';
import CreateInfo from '../component/createInfo';


const Stack = createStackNavigator();

export default function NewsfeedStack() {
    return (
        <Stack.Navigator initialRouteName='Newsfeed' >
            <Stack.Screen name='Newsfeed' component={Newsfeed} options={{ headerShown: false }} />
            <Stack.Screen name='Comment' component={Comment} options={{ headerShown: false }} />

        </Stack.Navigator>
    )
}