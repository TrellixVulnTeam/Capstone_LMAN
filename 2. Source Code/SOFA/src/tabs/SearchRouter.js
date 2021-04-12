import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { Vertical } from '../common/const';
import { scale } from '../common/utils';
import SearchPostTab from "./searchPostTab";
import SearchUserTab from "./searchUserTab";

const SearchNavigator = createMaterialTopTabNavigator(
    {
        SearchPostTab: SearchPostTab,
        SearchUserTab: SearchUserTab,
    },
    {
        tabBarOptions: {
            activeTintColor: '#2a7ea0',
            inactiveTintColor: '#C7C7C7',
            pressColor: '#2a7ea0',
            showLabel: true,
            style: {
                backgroundColor: 'white',
            },
            lazy: true,
            tabStyle: {
                height: scale(40, Vertical),
            },
            indicatorStyle: {
                backgroundColor: '#2a7ea0'
            }
        },
    }
)
export default createAppContainer(SearchNavigator);