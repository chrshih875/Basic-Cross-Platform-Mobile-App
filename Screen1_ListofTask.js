import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Table, Row } from 'react-native-table-component';
import Swipeout from 'react-native-swipeout';

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

    const handleDeleteItem = async (id) => {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTasks));
      setTasks([...updatedTasks]);
    };

    const swipeoutButton = (item) => {
      return [
        {
          text: 'Delete',
          onPress: () => handleDeleteItem(item),
          backgroundColor: 'red',
        },
      ];
    };

    const tableHead = ['Name', 'Task'];
    const tableData = tasks.map((item) => [item.id, item.name, item.task,]);

    return (
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
            <Row
              data={tableHead}
              style={{ height: 40, backgroundColor: '#add8e6'}}
              textStyle={{ padding: 10, textAlign: 'center', fontWeight: 'bold' }}
            />
            {tableData.map((item) => (
              <Swipeout right={swipeoutButton(item[0])} key={item[0]}>
              <Row
                data={item.slice(1)}
                style={{ height: undefined }}
              />
              </Swipeout>
            ))}
          </Table>
          <Button title="Add New Task" onPress={handleAddItem} />
        </View>
      );
};

export default ListofTask;
