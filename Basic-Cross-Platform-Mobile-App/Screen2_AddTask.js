import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTask = ({ navigation }) => {
    const [name, setName] = useState('');
    const [task, setTask] = useState('');

    const handleAddItem = async () => {
        if (name.trim() !== '' && task.trim() !== '') {
          try {
            const storedData = await AsyncStorage.getItem('todos');
            const data = storedData ? JSON.parse(storedData) : [];
            const newItem = { id: data.length+ 1, name, task };
            const newData = [...data, newItem];

            await AsyncStorage.setItem('todos', JSON.stringify(newData));
            navigation.navigate('List of Task', { data: newData });
          } catch (error) {
            console.error('Error adding item:', error);
          }
        } else {
          Alert.alert('Error', 'Please enter both a name and a task.', [
            { text: 'Redo', onPress: () => console.log('Redo Pressed') },
          ]);
        }
      };

      return (
        <View>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Enter Name"
          />
          <TextInput
            value={task}
            onChangeText={(text) => setTask(text)}
            placeholder="Enter Task"
          />
          <Button title="Add Task" onPress={handleAddItem} />
        </View>
      );
};

export default AddTask;
