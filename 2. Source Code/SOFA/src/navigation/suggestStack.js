import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Suggest from '../component/suggest';
import Comment from '../component/comment';

const Stack = createStackNavigator();

export default function SuggestStack() {
    return (
        <Stack.Navigator initialRouteName='Suggest' >
            <Stack.Screen name='Suggest' component={Suggest} initialParams={{ isRefresh: true }} options={{ headerShown: false }} />
            <Stack.Screen name='Comment' component={Comment} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}