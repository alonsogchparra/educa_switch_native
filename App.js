import React from 'react';
import Drawer from './src/components/routes/Drawer';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <Drawer />
    </PaperProvider>
  );
}