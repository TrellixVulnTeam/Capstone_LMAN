import React from 'react';  
import {createAppContainer} from 'react-navigation';  
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import VoucherEnable from "./VoucherEnable";
import VoucherExpired from "./VoucherExpired";
import VoucherUsed from "./VoucherUsed";

const VoucherNavigator = createMaterialTopTabNavigator(  
    {  
        VoucherEnable: VoucherEnable, 
        VoucherUsed: VoucherUsed,  
        VoucherExpired: VoucherExpired,  
         
    },  
    {  
        tabBarOptions: {  
            activeTintColor: 'white',  
            showIcon: true,  
            showLabel:true,  
            style: {  
                backgroundColor:'rgba(251, 184, 151, 1)'  
            }  
        },  
    }  
)  
export default createAppContainer(VoucherNavigator);  