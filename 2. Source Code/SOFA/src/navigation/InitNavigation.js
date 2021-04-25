import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Introduction from '../component/introduction';
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
import MessageSearch from '../component/messageSearch';
import EditPost from '../component/editPost';
import CreateFeedback from '../component/createFeedback';
import ListFeedback from '../component/listFeedback';
import SellPlace from '../component/sellPlace';
import FeedbackDetail from '../component/feedbackDetail';
import Search from '../component/search';
import Support from '../component/support';
import SupportRequestDetail from '../component/supportRequestDetail';
import Report from '../component/report';
import ListMarkupPost from '../component/listMarkupPost';
import Settings from '../component/settings';
import ListInfo from '../component/infoList';
import InfoDetail from '../component/infoDetail';
import Topup from '../component/topup';
const Stack = createStackNavigator();

export const navigationRef = React.createRef();

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}
export function Navigation() {

    return (
        <NavigationContainer
            ref={navigationRef}
        >
            <Stack.Navigator initialRouteName='Intro' >
                <Stack.Screen name='Intro' component={Introduction} options={{ headerShown: false }} />
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
                <Stack.Screen name='MessageSearch' component={MessageSearch} options={{ headerShown: false }} />
                <Stack.Screen name='EditPost' component={EditPost} options={{ headerShown: false }} />
                <Stack.Screen name='CreateFeedback' component={CreateFeedback} options={{ headerShown: false }} />
                <Stack.Screen name='ListFeedback' component={ListFeedback} options={{ headerShown: false }} />
                <Stack.Screen name='SellPlace' component={SellPlace} options={{ headerShown: false }} />
                <Stack.Screen name='FeedbackDetail' component={FeedbackDetail} options={{ headerShown: false }} />
                <Stack.Screen name='Search' component={Search} options={{ headerShown: false }} />
                <Stack.Screen name='Support' component={Support} options={{ headerShown: false }} />
                <Stack.Screen name='SupportRequestDetail' component={SupportRequestDetail} options={{ headerShown: false }} />
                <Stack.Screen name='Report' component={Report} options={{ headerShown: false }} />
                <Stack.Screen name='ListMarkupPost' component={ListMarkupPost} options={{ headerShown: false }} />
                <Stack.Screen name='Settings' component={Settings} options={{ headerShown: false }} />
                <Stack.Screen name='ListInfo' component={ListInfo} options={{ headerShown: false }} />
                <Stack.Screen name='InfoDetail' component={InfoDetail} options={{ headerShown: false }} />
                <Stack.Screen name='Topup' component={Topup} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}