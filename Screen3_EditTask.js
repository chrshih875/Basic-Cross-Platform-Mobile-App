import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditTask = ({ route, navigation }) => {
    const { item } = route.params;
    const [name, setName] = useState(item[1]);
    const [task, setTask] = useState(item[2]);

    const handleEditItem = async () => {
        try {
        const storedData = await AsyncStorage.getItem('todos');
        const data = storedData ? JSON.parse(storedData) : [];
        const index = data.findIndex((t) => t.id === item[0]);

        data[index] = { id: item[0], name, task };

        await AsyncStorage.setItem('todos', JSON.stringify(data));
        navigation.navigate('List of Task');
        } catch (error) {
        console.error('Error editing item:', error);
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
            placeholder={name}
            value={name}
            onChangeText={(text) => setName(text)}
        />
        <TextInput
        style={{
                padding: 10,
                borderBottomWidth: 1,
                marginBottom: 10,
            }}
            placeholder={task}
            value={task}
            onChangeText={(text) => setTask(text)}
        />
        <Button title="Save Changes" onPress={handleEditItem} />
        </View>
    );
};

export default EditTask;
