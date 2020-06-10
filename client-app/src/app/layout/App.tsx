import React, {useState, useEffect, Fragment} from 'react';
import { Container } from "semantic-ui-react";
import axios from 'axios';
import { IActivity } from '../models/activity';
import { NavBar } from '../../features/nav/NavBar';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';

const App = () =>  {
  
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectedActivity = (id: string) => {
    setEditMode(false);
    setSelectedActivity(activities.filter( a => a.id === id)[0]);
  } 

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleEditActivity = (activity: IActivity) => {
    setActivities([...activities.filter(act => act.id !== activity.id),activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  }

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(act => act.id !== id)]);
  }

  useEffect( () => {
    axios.get<IActivity[]>('http://localhost:5000/api/activities').then(res => {
      let activities: IActivity[] = [];
      res.data.forEach(activity => {
        activity.date = activity.date.split('.')[0];
        activities.push(activity);
      });
      setActivities(activities);
    });
  }, [])

  
  return (
    <Fragment>
      <NavBar handleOpenCreateForm={handleOpenCreateForm} />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activities} 
          selectActivity={handleSelectedActivity} 
          selectedActivity={selectedActivity!} 
          setSelectedActivity={setSelectedActivity}
          editMode={editMode} 
          createActivity={handleCreateActivity} 
          editActivity={handleEditActivity} 
          setEditMode={setEditMode} 
          deleteActivity={handleDeleteActivity} />
      </Container>
    </Fragment>
  );
}

export default App;
