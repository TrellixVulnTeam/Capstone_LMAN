import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


import Home from '../components/home';
import Login from '../components/login';
import Register from '../components/register';

const Stack = createStackNavigator();

export default function Navigation(){
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home' >
                <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
                <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
                <Stack.Screen name='Register' component={Register} options={{headerShown:false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}