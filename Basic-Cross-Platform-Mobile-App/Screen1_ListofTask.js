import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';

const ListofTask = ({ navigation, route }) => {
    const data = route.params?.data || [];

    return (
        <View>
          <Text>List of Tasks:</Text>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                <Text>{item.name}: {item.task}</Text>
              </View>
            )}
          />
          <Button
            title="Add New Task"
            onPress={() => navigation.navigate('Add Task', { data })}
          />
        </View>
      );
};

export default ListofTask;
