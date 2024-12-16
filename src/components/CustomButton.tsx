import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CustomButtonProps {
    title: string;
    onPress: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: { backgroundColor: '#007BFF', padding: 10, borderRadius: 5 },
    text: { color: '#FFF', textAlign: 'center' },
});

export default CustomButton;