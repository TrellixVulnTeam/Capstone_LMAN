import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Suggest from '../component/suggest';

const Stack = createStackNavigator();

export default function SuggestStack() {
    return (
        <Stack.Navigator initialRouteName='Suggest' >
            <Stack.Screen name='Suggest' component={Suggest} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}