import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListofTask from './Screen1_ListofTask';
import AddTask from './Screen2_AddTask';
import EditTask from './Screen3_EditTask';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Screen1">
        <Stack.Screen name="List of Tasks" component={ListofTask} />
        <Stack.Screen name="Add Task" component={AddTask} />
        <Stack.Screen name="Edit Task" component={EditTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
