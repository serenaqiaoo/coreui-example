import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "../ui/date-picker";

export const DashbaordPageContent: React.FC = () => {
    return (
        <div>
            <Textarea placeholder="Enter the repo links you are interested in line by line." rows={5} />
            <DatePicker />
        </div>
    );
};
