import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Main from './Main';
import "react-native-url-polyfill/auto"

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Alfred" component={Main} />
          </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;