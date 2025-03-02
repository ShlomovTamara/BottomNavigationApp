import React, {ReactElement} from 'react';
import { View, StyleSheet } from 'react-native';

const ProfileScreen = () : ReactElement => {
    return (
        <View style={styles.container}/>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProfileScreen;
