import { Status, Label, Priority, Task } from "../task-data-schema";



export const STORE: Task[] = [
    {
        id: '1',
        code: 'TASK-1',
        title: 'ghagent is the best web app',
        status: Status.TODO,
        label: Label.BUG,
        priority: Priority.LOW,
    },
    {
        id: '2',
        code: 'TASK-2',
        title: 'ghagent is the best web app',
        status: Status.PROGRESS,
        label: Label.FEATURE,
        priority: Priority.MEDIUM,
    },
    {
        id: '3',
        code: 'TASK-3',
        title: 'ghagent is the best web app',
        status: Status.DONE,
        label: Label.ENHANCEMENT,
        priority: Priority.LOW,
    },
    {
        id: '4',
        code: 'TASK-4',
        title: 'ghagent is the best web app',
        status: Status.CANCELED,
        label: Label.FEATURE,
        priority: Priority.MEDIUM,
    },
];
