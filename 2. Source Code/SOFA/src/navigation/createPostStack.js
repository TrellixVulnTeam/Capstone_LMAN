import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import CreatePost from '../component/createPost';
import EditImage from '../component/editImage';


const Stack = createStackNavigator();

export default function CreatePostStack() {
    return (
        <Stack.Navigator initialRouteName='createpost' >
            <Stack.Screen name='CreatePost' component={CreatePost} options={{ headerShown: false }} />
            <Stack.Screen name='EditImage' component={EditImage} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}