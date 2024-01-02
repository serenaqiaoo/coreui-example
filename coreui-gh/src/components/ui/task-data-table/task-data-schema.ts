export enum Status {
    TODO = 'todo',
    PROGRESS = 'in-progress',
    DONE = 'done',
    CANCELED = 'canceled',
}

export enum Label {
    BUG = 'bug',
    FEATURE = 'feature',
    ENHANCEMENT = 'enhancement',
    DOCUMENTATION = 'documentation',
}

export enum Priority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export interface Task {
    id: string;
    code: string;
    title: string;
    status: Status;
    label: Label;
    priority: Priority;
}

export const tasks: Task[] = [
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
];

