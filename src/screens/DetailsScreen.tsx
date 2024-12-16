import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { updateTask } from '../services/taskService';
import Task from '../database/models/Task';

type RootStackParamList = {
    Details: { task: InstanceType<typeof Task> };
};

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

interface DetailsScreenProps {
    route: DetailsScreenRouteProp;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
    const { task } = route.params;
    const navigation = useNavigation<DetailsScreenNavigationProp>();

    const [title, setTitle] = useState(task.title);
    const [isCompleted, setIsCompleted] = useState(task.isCompleted);

    const handleUpdate = async () => {
        try {
            await updateTask(task, { title, is_completed: isCompleted });
            navigation.goBack();
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Task Title</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter task title"
            />

            <View style={styles.checkboxContainer}>
                <Text style={styles.label}>Completed:</Text>
                <Button
                    title={isCompleted ? 'Yes' : 'No'}
                    onPress={() => setIsCompleted((prev) => !prev)}
                />
            </View>

            <Button title="Update Task" onPress={handleUpdate} color="#007BFF" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFF',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
});

export default DetailsScreen;