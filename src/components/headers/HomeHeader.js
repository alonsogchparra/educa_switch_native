import React from 'react';
import { Appbar } from 'react-native-paper';

export default function HomeHeader({ navigation }) {
  const openMenu = () => {
    navigation.openDrawer();
  }

  return (
    <Appbar.Header>
      <Appbar.Action icon="menu" onPress={openMenu} />
      <Appbar.Content
        title='Github'
        subtitle="App Challenge"
      />
    </Appbar.Header>
  )
}