import { tableSchema } from '@nozbe/watermelondb';

export const taskSchema = tableSchema({
    name: 'tasks',
    columns: [
        { name: 'title', type: 'string' },
        { name: 'is_completed', type: 'boolean' },
        { name: 'created_at', type: 'number' },
        { name: 'deadline', type: 'number', isOptional: true },
    ],
});
