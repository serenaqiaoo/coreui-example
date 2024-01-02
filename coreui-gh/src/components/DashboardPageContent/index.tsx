import React, { useState } from 'react';

import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "../ui/date-picker";
import { Button } from '../ui/button';
import { Shell } from '../ui/shell';
import { TasksTableShell } from '../ui/task-data-table';

export const DashbaordPageContent: React.FC = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    return (
        <div>
            <Textarea placeholder="Enter the repo links you are interested in line by line." rows={5} />
            <DatePicker />
            <DatePicker />
            <Button>Fetch relevant repos</Button>
            <Shell>
                {/* Pass the DataTable component through the TasksTableShell component to memoize the columns which can not be done on react-server-components */}
                <TasksTableShell />
            </Shell>
        </div>
    );
};
