import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

const AddTask = ({ navigation, route }) => {
    const [name, setName] = useState('');
    const [task, setTask] = useState('');

    const data = route.params?.data || [];

    const handleAddItem = () => {
        if (name.trim() !== '' && task.trim() !== '') {
          const newTask = { id: data.length + 1, name, task };
          navigation.navigate('List of Task', { data: [...data, newTask] });
        } else {
        }
      };

      return (
        <View>
          <Text>Add a New Task:</Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Enter name"
          />
          <TextInput
            value={task}
            onChangeText={(text) => setTask(text)}
            placeholder="Enter task"
          />
          <Button title="Add Task" onPress={handleAddItem} />
        </View>
      );
};

export default AddTask;
