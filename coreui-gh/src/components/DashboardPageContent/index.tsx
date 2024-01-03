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
import { Shell } from '../ui/shell';

export const DashbaordPageContent: React.FC = () => {
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [indexed, setIndexed] = useState(false);
    const [isIndexing, setIsIndexing] = useState(false);
    const [progress, setProgress] = React.useState(33);
    const [repoLinks, setRepoLinks] = useState('');

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
            <div className="grid grid-rows-3 grid-flow-col gap-4">
                <div className="row-span-3">
                    <Textarea
                        placeholder="Enter the repo links you are interested in line by line."
                        rows={5}
                        onValueChange={setRepoLinks}
                    />
                </div>
                <div className="col-span-1">
                    <DatePicker placeholder='Select start date' onDateChange={setStartDate} />
                </div>
                <div className="row-span-1 col-span-1">
                    <DatePicker placeholder='Select end date' onDateChange={setEndDate} />
                </div>
            </div>

            <Button
                className='mb-10'
                onClick={() => indexData({ repoLinks: repoLinks, startDate: startDate?.getTime() || -1, endDate: endDate?.getTime() || -1 })}
                disabled={isIndexing}>
                Fetch relevant repos
            </Button>

            {isIndexing && <Progress value={progress} />}


            {indexed && !isIndexing && (<><Separator className="my-6" />
                <div className="space-y-5 mt-5">
                    <h2 className="text-xl font-bold tracking-tight">Relevant Repos</h2>
                    <Shell><RepoDataTable /></Shell>
                </div>
                <Separator className="my-6" />
                <div className="space-y-5 mt-5">
                    <h2 className="text-xl font-bold tracking-tight">Potential Stargazers</h2>
                    <Shell><UserDataTable /></Shell>
                </div></>)}
        </div>
    );
};
