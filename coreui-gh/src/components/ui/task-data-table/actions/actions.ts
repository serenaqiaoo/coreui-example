// updateTaskPriority,
// updateTaskStatus,
// deleteTask,

import type { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { mockAsyncTimeout } from '@/helpers/index';
import { FetchTableDataPayload, FetchTableDataResponse } from '@/components/ui/data-table/hooks/use-data-table';
import { Task } from '../task-data-schema';
import { STORE } from './mockTaskData';

export interface GetTasksRequest extends FetchTableDataPayload { }

export const getTasks = async (request: GetTasksRequest): Promise<FetchTableDataResponse<Task>> => {
    const pageSize = request.pageSize || 10;
    const page = request.pageIndex || 1;
    const data: FetchTableDataResponse<Task> = {
        data: STORE.slice((page - 1) * pageSize, page * pageSize),
        pageCount: STORE.length / pageSize,
    }
    await mockAsyncTimeout(2000);
    return data;
};

export default async (
    req: NextApiRequest,
    res: NextApiResponse<FetchTableDataResponse<Task> | { error: string }>
) => {
    await NextCors(req, res, {
        methods: ['POST'],
        origin: [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost:3002',
        ],
        optionsSuccessStatus: 200,
    });

    const request: GetTasksRequest = {
        pageIndex: req.body.pageIndex,
        pageSize: req.body.pageSize,
    }

    const resp = await getTasks(request);
    res.status(200).json(resp);
};
