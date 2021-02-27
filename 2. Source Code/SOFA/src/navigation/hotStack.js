import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Hot from '../component/hot';

const Stack = createStackNavigator();

export default function HotStack() {
    return (
        <Stack.Navigator initialRouteName='Hot' >
            <Stack.Screen name='Hot' component={Hot} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}