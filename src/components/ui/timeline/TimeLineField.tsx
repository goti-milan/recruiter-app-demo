import { EducationTable, WorkExperienceTable } from '@/types/applications.types';
import { Timeline, TimelineProps } from 'primereact/timeline';
import React from 'react';
interface TimeLineFieldProps extends TimelineProps {
    event: EducationTable[] | WorkExperienceTable[];
    customizedMarker?: ((item: EducationTable) => React.ReactNode) | ((item: WorkExperienceTable) => React.ReactNode);
}

const TimeLineField: React.FC<TimeLineFieldProps> = ({ event, customizedMarker }) => {

    return (
        <Timeline
            value={event}
            content={customizedMarker}
            pt={{
                marker: { className: "bg-primary border-none" },
                connector: { className: "w-0.5 bg-gradient-to-b from-primary to-white" },
                opposite: { className: "hidden" },
                content: { className: "mb-4" }
            }}
        />
    )
}

export default TimeLineField
