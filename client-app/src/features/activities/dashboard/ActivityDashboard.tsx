import React from 'react'
import { Grid } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity';
import { ActivityList } from './ActivityList';
import { ActivityDetails } from '../details/ActivityDetails';
import { ActivityForm } from '../form/ActivityForm';

interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void;
    selectedActivity: IActivity;
    setSelectedActivity: (act: IActivity | null) => void;
    editMode: boolean;
    createActivity: (act: IActivity) => void;
    editActivity: (act: IActivity) => void;
    setEditMode: (editMode: boolean) => void;
    deleteActivity: (id: string) => void;
}

export const ActivityDashboard: React.FC<IProps> = ({ 
    activities, 
    selectActivity, 
    selectedActivity,
    setSelectedActivity,
    editMode, 
    createActivity,
    editActivity,
    setEditMode,
    deleteActivity }) => {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                    (<ActivityDetails activity={selectedActivity} setEditMode={setEditMode} setSelectedActivity={setSelectedActivity} />) }
                {editMode && <ActivityForm 
                                key={selectedActivity && selectedActivity.id || 0}
                                setEditMode={setEditMode} 
                                activity={selectedActivity} 
                                createActivity={createActivity} 
                                editActivity={editActivity} />}
            </Grid.Column>
        </Grid>
    )
}
