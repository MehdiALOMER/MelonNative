import { tableSchema } from '@nozbe/watermelondb';

export const projectSchema = tableSchema({
    name: 'projects',
    columns: [
        { name: 'name', type: 'string' },
        { name: 'created_at', type: 'number' },
    ],
});
