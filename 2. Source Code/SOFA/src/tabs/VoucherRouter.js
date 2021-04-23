import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { Vertical } from '../common/const';
import { scale } from '../common/utils';
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
            activeTintColor: '#2a7ea0',
            inactiveTintColor: 'gray',
            indicatorStyle: {
                backgroundColor: '#2a7ea0',
            },
            showIcon: true,
            showLabel: true,
            style: {
                height: scale(50, Vertical),
                backgroundColor: 'rgba(255, 255, 255, 1)',
            },
            contentContainerStyle: {
                height: scale(50, Vertical)
            }
        },
    }
)
export default createAppContainer(VoucherNavigator);