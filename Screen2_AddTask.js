import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, ScrollView  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTask = ({ navigation }) => {
    const [name, setName] = useState('');
    const [task, setTask] = useState('');
    const [lastId, setLastId] = useState(0);

    useEffect(() => {
      const fetchLastId = async () => {
        try {
          const storedLastId = await AsyncStorage.getItem('lastId');
          if (storedLastId) {
            setLastId(parseInt(storedLastId, 10));
          }
        } catch (error) {
          console.error('Error fetching last ID:', error);
        }
      };
      fetchLastId();
    }, []);

    const handleAddItem = async () => {
        if (name.trim() !== '' && task.trim() !== '') {
          try {
            const storedData = await AsyncStorage.getItem('todos');
            const data = storedData ? JSON.parse(storedData) : [];
            const newItem = { id: lastId+1, name, task };
            const newData = [...data, newItem];

            await AsyncStorage.setItem('todos', JSON.stringify(newData));
            await AsyncStorage.setItem('lastId', String(lastId + 1));
            setLastId(lastId + 1);
            navigation.navigate('List of Tasks', { data: newData });
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
              placeholder="Task"
              value={task}
              onChangeText={(text) => setTask(text)}
            />
            <Button title="Add Task" onPress={handleAddItem} />
          </View>
      );
};

export default AddTask;
