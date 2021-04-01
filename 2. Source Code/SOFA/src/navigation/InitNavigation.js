import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../component/login';
import Register from '../component/register';
import BottomNav from '../navigation/bottomNavigation'
import OtherProfile from '../component/otherProfile';
import Setting from "../component/setting";
import ChangePassword from '../component/changePassword';
import PhoneRegister from '../component/phoneRegister';
import Verification from '../component/verification';
import Balance from '../component/balance';
import Voucher from '../component/voucher';
import VoucherDetail from '../component/voucherDetail';
import ViewImage from '../component/viewImage';
import CreateInfo from '../component/createInfo';
import Conversation from '../component/conversation';
import Notification from '../component/notification';
import PostDetail from '../component/postDetail';
import Message from '../component/message';
import ListFollower from '../component/listFollower';
import Profile from '../component/profile';

const Stack = createStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='BottomNav' >
                <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
                <Stack.Screen name='BottomNav' component={BottomNav} options={{ headerShown: false }} />
                <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
                <Stack.Screen name='OtherProfile' component={OtherProfile} options={{ headerShown: false }} />
                <Stack.Screen name='Setting' component={Setting} options={{ headerShown: false }} />
                <Stack.Screen name='ChangePassword' component={ChangePassword} options={{ headerShown: false }} />
                <Stack.Screen name='PhoneRegister' component={PhoneRegister} options={{ headerShown: false }} />
                <Stack.Screen name="Verification" component={Verification} options={{ headerShown: false }} />
                <Stack.Screen name="Balance" component={Balance} options={{ headerShown: false }} />
                <Stack.Screen name="Voucher" component={Voucher} options={{ headerShown: false }} />
                <Stack.Screen name="VoucherDetail" component={VoucherDetail} options={{ headerShown: false }} />
                <Stack.Screen name="ViewImage" component={ViewImage} options={{ headerShown: false }} />
                <Stack.Screen name="CreateInfo" component={CreateInfo} options={{ headerShown: false }} />
                <Stack.Screen name='Conversation' component={Conversation} options={{ headerShown: false }} />
                <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
                <Stack.Screen name='PostDetail' component={PostDetail} options={{ headerShown: false }} />
                <Stack.Screen name='Message' component={Message} options={{ headerShown: false }} />
                <Stack.Screen name='ListFollower' component={ListFollower} options={{ headerShown: false }} />
                <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}