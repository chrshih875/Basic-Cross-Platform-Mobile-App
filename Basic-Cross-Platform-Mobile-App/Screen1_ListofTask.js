import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListofTask = ({ navigation }) => {
    const [tasks, setTasks] = useState([]);

  const loadData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('todos');
      if (storedData) {
        setTasks(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });

    return unsubscribe;
  }, [navigation]);

  const handleAddItem = () => {
    navigation.navigate('Add Task', { tasks });
  };

    return (
        <View>
          <Text>Name - Task</Text>
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                <Text>{item.name}: {item.task}</Text>
              </View>
            )}
          />
          <Button title="Add New Task" onPress={handleAddItem} />
        </View>
      );
};

export default ListofTask;
