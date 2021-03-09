import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Balance from '../component/Balance';

const Stack = createStackNavigator();

export default function BalanceStack() {
    return (
        <Stack.Navigator initialRouteName='Balance' >
            <Stack.Screen name='Balance' component={Balance} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}