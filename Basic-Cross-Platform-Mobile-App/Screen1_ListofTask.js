import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Table, Row } from 'react-native-table-component';

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

    const tableHead = ['Name', 'Task'];
    const tableData = tasks.map(item => [item.name, item.task]);

    return (
        <View>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
            <Row
                data={tableHead}
                style={{ height: 40, backgroundColor: '#f1f8ff' }}
            />
            {tableData.map((rowData, index) => (
                <Row
                key={index}
                data={rowData}
                style={{ height: 40 }}
                />
            ))}
            </Table>
            <Button title="Add New Task" onPress={handleAddItem} />
        </View>
        );
};

export default ListofTask;
