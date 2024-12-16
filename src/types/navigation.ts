import Task from '../database/models/Task';

export type RootStackParamList = {
    Home: undefined;
    Details: { task: InstanceType<typeof Task> };
};