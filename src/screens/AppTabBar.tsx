import React, {useEffect} from 'react';
import { StyleSheet} from 'react-native';
import {NavigationHelpers, ParamListBase, TabNavigationState, useTheme} from '@react-navigation/native';
import { Text, Pressable } from 'react-native';
import {BottomTabNavigationEventMap} from '@react-navigation/bottom-tabs';
import Animated from 'react-native-reanimated';
import {BarPosition, TAB_BAR_HEIGHT, useBarAnimation} from '../hooks/useBarAnimation.tsx';
import {ScrollDirection, useScrollDirectionState} from '../hooks/scrollDirection.hooks.ts';

type MyTabBarProps = {
    state: TabNavigationState<ParamListBase>;
    descriptors: Record<string, { options: Record<string, any> }>;
    navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
};
const AppTabBar: React.FC<MyTabBarProps> = ({ state, descriptors, navigation }) => {
    const { colors } = useTheme();
    const { animatedStyle } = useBarAnimation(BarPosition.BOTTOM);
    const [, setDirection] = useScrollDirectionState();

    useEffect(() => {
        setDirection(ScrollDirection.Up);
    }, []);

    return (
        <Animated.View style={[styles.container, { height: TAB_BAR_HEIGHT }, animatedStyle ]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel ?? options.title ?? route.name;

                const isFocused = state.index === index;

                const onPress = () => {!isFocused && navigation.navigate(route.name, route.params);};

                return (
                    <Pressable
                        key={route.key}
                        onPress={onPress}
                        style={styles.tab}>
                        <Text style={{ color: isFocused ? colors.primary : colors.text }}>{label}</Text>
                    </Pressable>
                );
            })}
        </Animated.View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        ...StyleSheet.absoluteFillObject,
        top:'auto',
    },
    tab: {
        flex: 1, alignItems: 'center', padding: 10,
    },
});
export default AppTabBar;
