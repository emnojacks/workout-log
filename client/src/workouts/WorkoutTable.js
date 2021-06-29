//this component just displays - it doesn't deal with state

import React from 'react';
import { Table, Button} from 'reactstrap';

//this func is passed props which is an object/array of all the users workouts
//request ed by the fetchWorkouts func
//we need to map over them to display them 

const WorkoutTable = (props) => {
//you must pass a workout into this func for it to fire 
    const deleteWorkout = (workout) => {
        fetch(`http://localhost:3000/log/${workout.id}`, {
            method: "DELETE",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${props.token}`
            })
        })
            //fetchs new workouts to fill the table
            .then(() => props.fetchWorkouts())
            .catch((error) => { console.log(error.message) })
    }
    
    const workoutMapper = () => {
        //callback with workout and index says do this thing to every workout/item and passes index of 
        //each element in the array
        //.map always needs a return for each element in the array
        //otherwise it won't build a new array 
        return props.workouts.map((workout, index) =>
        {
            return (
                // For every workout object, we create a new table row.  React will throw a warning if we don't attach a unique key to repeated JSX elements (our <tr>s, in this case), so we use the index number of every workout as a unique identifier for that table row. 
                <tr key={index}>
                    <th scope="row">{workout.id}</th>
                    <td>{workout.result}</td>
                    <td>{workout.description}</td>
                    <td>{workout.definition}</td>
                    <td>
                        <Button
                            color="warning"
                            onClick={() =>
                            { props.editUpdateWorkout(workout); props.updateOn() }}>
                            Update
                        </Button>
                        <Button
                            color="danger"
                            onClick={()=>{deleteWorkout(workout)}}
                        >Delete
                        </Button>
                    </td>
                </tr>
            )
        })
    }
    
    return (
        <div>
            <h3>
            Workout History
            </h3>
            <Table striped>
                <thead>
                    <tr>
                    <th>
                    #
                    </th>
                    <th>
                    Result
                    </th>
                    <th>
                    Description
                    </th>
                    <th>
                    Definition
                    </th>
                </tr>
                </thead>
                
                <tbody>
                {workoutMapper()}
                </tbody>
            </Table>
        </div>
    );
};

export default WorkoutTable;