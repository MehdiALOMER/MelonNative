import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import Task from './models/Task';
import Project from './models/Project';
import migrations from './migrations';
import { taskSchema } from './schema/taskSchema';
import { projectSchema } from './schema/projectSchema';

import { appSchema } from '@nozbe/watermelondb';

const schema = appSchema({
    version: 3,
    tables: [taskSchema, projectSchema],
});

const adapter = new SQLiteAdapter({
    schema,
    migrations,
});

const database = new Database({
    adapter,
    modelClasses: [Task, Project],
});

export default database;
