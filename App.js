/**
 * Ubix
 *
 * @format
 * @flow
 */

import 'react-native-gesture-handler'; // First line on new versions
import React from 'react';
import {LogBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';

enableScreens();

// TODO: Remove when fixed
// YellowBox.ignoreWarnings([
//   'VirtualizedLists should never be nested',
//   'Warning: componentWillReceiveProps has been renamed, and is not recommended',
//   'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
//   // 'Setting a timer',
// ]);

// LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
LogBox.ignoreLogs([
  'Warning: componentWillReceiveProps has been renamed, and is not recommended',
]);
LogBox.ignoreLogs([
  'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`',
]);
LogBox.ignoreLogs([
  'Warning: componentWillUpdate has been renamed, and is not recommended for use',
]);

LogBox.ignoreLogs(['Setting a timer']);

import MainNavigator from './src/navigation/MainNavigator';

// App
function App() {
  return (
    <SafeAreaProvider>
      <MainNavigator />
    </SafeAreaProvider>
  );
}

export default App;
