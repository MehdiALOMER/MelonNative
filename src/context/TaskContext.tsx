import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Task {
    id: string;
    title: string;
    isCompleted: boolean;
}

interface TaskContextProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    return <TaskContext.Provider value={{ tasks, setTasks }}>{children}</TaskContext.Provider>;
};

export const useTask = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error('useTask must be used within a TaskProvider');
    return context;
};