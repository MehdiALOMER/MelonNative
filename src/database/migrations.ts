import { schemaMigrations, createTable, addColumns } from '@nozbe/watermelondb/Schema/migrations';

export default schemaMigrations({
    migrations: [
        {
            toVersion: 2,
            steps: [
                createTable({
                    name: 'projects',
                    columns: [
                        { name: 'name', type: 'string' },
                        { name: 'created_at', type: 'number' },
                    ],
                }),
            ],
        },
        {
            toVersion: 3,
            steps: [
                addColumns({
                    table: 'tasks',
                    columns: [
                        { name: 'deadline', type: 'number', isOptional: true },
                    ],
                }),
            ],
        },
    ],
});
