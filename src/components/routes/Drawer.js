import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home';
import About from '../screens/About';


const DrawerNav = createDrawerNavigator();
const Stack = createStackNavigator();

export default function Drawer() {
  return (
    <NavigationContainer>
      <DrawerNav.Navigator initialRouteName="Home">
        <DrawerNav.Screen name="Home" component={Home} />
        <DrawerNav.Screen name="About" component={About} />
      </DrawerNav.Navigator>
    </NavigationContainer>
  )
}