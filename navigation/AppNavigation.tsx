import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/MovieScreen';
import PersonScreen from '../screens/PersonScreen';
import SearchScreen from '../screens/SearchScreen';
import {ROUTES} from './route';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name={ROUTES.HOME}
          options={{headerShown: false}}
          component={HomeScreen}
        />
        <Stack.Screen
          name={ROUTES.MOVIE}
          options={{headerShown: false}}
          component={MovieScreen}
        />
        <Stack.Screen
          name={ROUTES.PERSON}
          options={{headerShown: false}}
          component={PersonScreen}
        />
        <Stack.Screen
          name={ROUTES.SEARCH}
          options={{headerShown: false}}
          component={SearchScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
