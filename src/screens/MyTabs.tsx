import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import AppTabBar from './AppTabBar.tsx';

const Tab = createBottomTabNavigator();

const MyTabs: React.FC = () => {
    return (
        <Tab.Navigator tabBar={(props) => <AppTabBar {...props} />}>
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default MyTabs;
