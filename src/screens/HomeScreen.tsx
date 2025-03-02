import React, { ReactElement, useCallback } from 'react';
import { Text, StyleSheet, FlatList, View, ListRenderItem } from 'react-native';
import { useScrollDirectionHandler } from '../hooks/scrollDirection.hooks.ts';
import {DataItem, dataMock} from '../mocks/MockData.ts';

const SCROLL_EVENT_THROTTLE = 20;

const HomeScreen: React.FC = (): ReactElement => {
    const scrollHandlerForOffset = useScrollDirectionHandler();

    // Memoized renderItem for performance
    const renderItem: ListRenderItem<DataItem> = useCallback(
        ({ item }) => <Text style={styles.text}>{item.title}</Text>,
        []
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={dataMock}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                onScroll={scrollHandlerForOffset}
                scrollEventThrottle={SCROLL_EVENT_THROTTLE}
            />
        </View>
    );
};

const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#F0F4F8',
        },
    text: {
        fontSize: 18,
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
});

export default HomeScreen;
