import { mockAsyncTimeout } from '@/helpers';
import type { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

export interface ProcessIndexRequest {
    repoLinks: string;
    startDate: number; //timestamp
    endDate: number; //timestamp
}

export const processIndex = async (request: ProcessIndexRequest): Promise<void> => {
    await mockAsyncTimeout(2000);
};

export default async (
    req: NextApiRequest,
    res: NextApiResponse<void | { error: string }>
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

    const request: ProcessIndexRequest = {
        repoLinks: req.body.repoLinks,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
    }

    const resp = await processIndex(request);
    res.status(200).json(resp);
};
