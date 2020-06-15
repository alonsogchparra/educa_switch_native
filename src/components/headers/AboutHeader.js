import React, { Component } from 'react';
import { Appbar } from 'react-native-paper';

export default function AboutHeader({ navigation }) {
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content
        title='About'
        subtitle="About Me"
      />
    </Appbar.Header>
  )
}