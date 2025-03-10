import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

const App = () => {
  return <AppNavigator />;
};

export default App;
