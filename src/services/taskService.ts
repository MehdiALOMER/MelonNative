import database from '../database/db';
import Task from '../database/models/Task';


export const fetchTasks = async () => {
    return await database.collections.get<Task>('tasks').query().fetch();
};

export const createTask = async (title: string) => {
    await database.write(async () => {
        await database.collections.get<Task>('tasks').create((task) => {
            task.title = title;
            task.isCompleted = false;
        });
    });
};

export const updateTask = async (task: Task, updates: Partial<{ title: string; is_completed: boolean }>) => {
    await database.write(async () => {
        await task.update((t) => {
            if (updates.title !== undefined) t.title = updates.title;
            if (updates.is_completed !== undefined) t.isCompleted = updates.is_completed;
        });
    });
};

export const deleteTask = async (task: Task) => {
    await database.write(async () => {
        await task.markAsDeleted();
    });
}