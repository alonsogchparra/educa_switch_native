import React from 'react';
import { View } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import AboutHeader from '../headers/AboutHeader';

export default function About ({ navigation }) {
  return (
    <View>
      <AboutHeader navigation={navigation} />
      <Card>
        <Card.Content>
          <Title>Alonso Parra</Title>
          <Paragraph>Software Engineer / Frontend Developer / Illustrator</Paragraph>
        </Card.Content>
      </Card>
    </View>
  )
}