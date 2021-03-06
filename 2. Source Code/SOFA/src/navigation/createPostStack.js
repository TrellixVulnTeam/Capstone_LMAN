import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import CreatePost from '../component/createPost';

const Stack = createStackNavigator();

export default function CreatePostStack() {
    return (
        <Stack.Navigator initialRouteName='createpost' >
            <Stack.Screen name='Newsfeed' component={CreatePost} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}