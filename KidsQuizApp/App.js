import React from 'react';
import { I18nManager } from 'react-native';
import { GameProvider } from './src/context/GameContext';
import AppNavigator from './src/navigation/AppNavigator';

// Force RTL layout for Arabic
I18nManager.forceRTL(true);

const App = () => (
  <GameProvider>
    <AppNavigator />
  </GameProvider>
);

export default App;
