import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../component/login';
import Register from '../component/register';
import BottomNav from '../navigation/bottomNavigation'
import Balance from '../component/balance';

const Stack = createStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='BottomNav' >
                <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
                <Stack.Screen name='BottomNav' component={BottomNav} options={{ headerShown: false }} />
                <Stack.Screen name='Register' component={Register} options={{headerShown:false}} />
                <Stack.Screen name='Balance' component={Balance} options={{ headerShown: false }} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}