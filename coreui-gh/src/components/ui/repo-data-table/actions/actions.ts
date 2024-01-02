import type { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';
import { mockAsyncTimeout } from '@/helpers/index';
import { FetchTableDataPayload, FetchTableDataResponse } from '@/components/ui/data-table/hooks/use-data-table';
import { Repo } from '../table-data-schema';
import { STORE } from './mockRepoData';

export interface GetReposRequest extends FetchTableDataPayload { }

export const getRepos = async (request: GetReposRequest): Promise<FetchTableDataResponse<Repo>> => {
    const pageSize = request.pageSize || 10;
    const pageIndex = request.pageIndex || 0;
    let tableData = STORE.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
    if (request.searchCriteriaList && request.searchCriteriaList.length > 0) {
        tableData = STORE.slice(0, 5);
    }
    if (request.sorting && request.sorting[0].desc) {
        tableData = tableData.reverse();
    }

    const data: FetchTableDataResponse<Repo> = {
        data: tableData,
        pageCount: STORE.length / pageSize,
    }
    await mockAsyncTimeout(2000);
    return data;
};

export default async (
    req: NextApiRequest,
    res: NextApiResponse<FetchTableDataResponse<Repo> | { error: string }>
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

    const request: GetReposRequest = {
        pageIndex: req.body.pageIndex,
        pageSize: req.body.pageSize,
    }

    const resp = await getRepos(request);
    res.status(200).json(resp);
};
