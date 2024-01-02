import React, { useState } from 'react';

import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "../ui/date-picker";
import { Button } from '../ui/button';
import { RepoDataTable } from '@/components/ui/repo-data-table'
import { UserDataTable } from '../ui/user-data-table';
import { Separator } from '../ui/separator';
import { ProcessIndexRequest } from '@/pages/api/process-index';
import axios from 'axios';
import { Progress } from "@/components/ui/progress";

export const DashbaordPageContent: React.FC = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [indexed, setIndexed] = useState(false);
    const [isIndexing, setIsIndexing] = useState(false);
    const [progress, setProgress] = React.useState(33);

    React.useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 2000)
        return () => clearTimeout(timer)
    }, [])

    const indexData = async (payload: ProcessIndexRequest) => {
        setIndexed(false);
        setIsIndexing(true);
        try {
            const response = await axios.post('/api/process-index', payload);
            console.log('response', response);
            setIndexed(true);
            setIsIndexing(false);
            return response.data;
        } catch (error: any) {
            setIndexed(false);
            setIsIndexing(false);
            throw new Error(error.response.data.message || 'An error occurred');
        }
    };


    return (
        <div>
            <div className="flex flex-row mb-10 gap-20">
                <Textarea placeholder="Enter the repo links you are interested in line by line." rows={5} />
                <div className='grid gap-2'>
                    <div className="flex flex-row">
                        <div className='font-bold'>Start Date: </div>
                        <DatePicker />
                    </div>
                    <div className="flex flex-row">
                        <div className='font-bold'>End Date: </div>
                        <DatePicker />
                    </div>
                </div>
            </div>

            <Button className='mb-10' onClick={() => indexData({ repoLinks: '', startDate: 0, endDate: 0 })} disabled={isIndexing}>Fetch relevant repos</Button>

            {isIndexing && <Progress value={progress} />}


            {indexed && !isIndexing && (<><Separator className="my-6" />
                <div className="space-y-5 mt-5">
                    <h2 className="text-xl font-bold tracking-tight">Relevant Repos</h2>
                    <RepoDataTable />
                </div>
                <Separator className="my-6" />
                <div className="space-y-5 mt-5">
                    <h2 className="text-xl font-bold tracking-tight">Potential Stargazers</h2>
                    <UserDataTable />
                </div></>)}
        </div>
    );
};
