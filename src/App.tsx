import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MyTabs from './screens/MyTabs.tsx';

const Stack = createStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={MyTabs}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
