import React from 'react';
import { TaskProvider } from './context/TaskContext';
import AppNavigator from './navigation/AppNavigator';

const App = () => (
  <TaskProvider>
    <AppNavigator />
  </TaskProvider>
);

export default App;