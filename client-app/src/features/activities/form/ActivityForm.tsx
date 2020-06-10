import React, {useState} from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'
import { IActivity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';

interface IProps {
    setEditMode: (editMode: boolean) => void; 
    activity: IActivity;
    createActivity: (act: IActivity) => void;
    editActivity: (act: IActivity) => void;
}

export const ActivityForm : React.FC<IProps> = ({ 
    setEditMode, 
    activity: initialFormState,
    createActivity,
    editActivity }) => {

    const initialActivity = () => {
        if (initialFormState) {
            return initialFormState;
        } else {
            return {
                id: '',
                title: '',
                description: '',
                category: '',
                date: '',
                city: '',
                venue: ''
            }
        }
    }

    const [activity, setFormActivity] = useState<IActivity>(initialActivity);

    const handleSubmit = () => {
        if (activity.id.length === 0) {
            let newAct = {
                ...activity,
                id: uuid()
            }
            console.log(newAct);
            editActivity(newAct);
        } else {    
            createActivity(activity);
        }
    }

    const handleInputChange = (event: any) => {
        const {name, value} = event.target;
        setFormActivity({ ...activity, [name]: value });
    } 

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input onChange={handleInputChange} name='title' placeholder='Title' value={activity.title} />
                <Form.TextArea onChange={handleInputChange} name='description' rows={2} placeholder='Description' value={activity.description} />
                <Form.Input onChange={handleInputChange} name='category' placeholder='Category' value={activity.category} />
                <Form.Input onChange={handleInputChange} name='date' type='datetime-local' placeholder='Date' value={activity.date} />
                <Form.Input onChange={handleInputChange} name="city" placeholder='City' value={activity.city} />
                <Form.Input onChange={handleInputChange} name="venue" placeholder='Venue' value={activity.venue} />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button floated='right' type='button' content='Cancel' onClick={() => setEditMode(false)}/>
            </Form>
        </Segment>
    )
}
