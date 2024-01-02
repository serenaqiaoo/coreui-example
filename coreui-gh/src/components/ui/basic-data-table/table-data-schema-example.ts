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

export const mockedTasks: Task[] = [

];

