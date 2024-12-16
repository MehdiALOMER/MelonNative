import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Button } from 'react-native';
import { useTask } from '../context/TaskContext';
import { fetchTasks, createTask } from '../services/taskService';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Task from '../database/models/Task';

type RootStackParamList = {
    Details: { task: InstanceType<typeof Task> };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;

const HomeScreen = () => {
    const { tasks, setTasks } = useTask();
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const [isModalVisible, setModalVisible] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
    };

    const goToDetails = (task: Task) => {
        navigation.navigate('Details', { task });
    };

    const handleAddTask = async () => {
        if (newTaskTitle.trim()) {
            await createTask(newTaskTitle.trim());
            setNewTaskTitle('');
            setModalVisible(false);
            loadTasks();
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Task List</Text>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.taskItem} onPress={() => goToDetails(item)}>
                        <Text style={styles.taskTitle}>{item.title}</Text>
                    </TouchableOpacity>
                )}
            />
            <CustomButton title="Add New Task" onPress={() => setModalVisible(true)} />

            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add New Task</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter task title"
                            value={newTaskTitle}
                            onChangeText={setNewTaskTitle}
                        />
                        <View style={styles.modalButtons}>
                            <Button title="Cancel" color="#888" onPress={() => setModalVisible(false)} />
                            <Button title="Add Task" color="#007BFF" onPress={handleAddTask} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    taskItem: {
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        backgroundColor: '#F9F9F9',
    },
    taskTitle: {
        fontSize: 16,
        color: '#444',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#FFF',
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default HomeScreen;