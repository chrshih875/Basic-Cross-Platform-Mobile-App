import React, { useState } from 'react';
import { View, TextInput, Button, Alert, ScrollView  } from 'react-native';
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
        <ScrollView>
          <View style={{ padding: 10 }}>
            <TextInput
              style={{
                padding: 10,
                borderBottomWidth: 1,
                marginBottom: 10,
              }}
              placeholder="Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              style={{
                padding: 10,
                borderBottomWidth: 1,
                marginBottom: 20,
              }}
              placeholder="Task "
              value={task}
              onChangeText={(text) => setTask(text)}
            />
            <Button title="Add Task" onPress={handleAddItem} />
          </View>
        </ScrollView>
      );
};

export default AddTask;
