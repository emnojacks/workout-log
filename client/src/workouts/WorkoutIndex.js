import { useState, useEffect } from "react";
import
{
    Container,
    Row,
    Col
} from 'reactstrap'
import WorkoutCreate from "./WorkoutCreate";
import WorkoutTable from "./WorkoutTable";
import WorkoutEdit from "./WorkoutEdit";

const WorkoutIndex = (props) => {
    const [workouts, setWorkouts] = useState([]);
    //initiated to false so only displays when user clicks update
    const [updateActive, setUpdateActive] = useState(false);
    const [workoutToUpdate, setWorkoutToUpdate] = useState([]);
    
    const fetchWorkouts = () => {
        fetch("http://localhost:3000/log",
            {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${props.token}`
                })
            })
            .then((res) => res.json())
            .then((logData) => {
                //save the response to our state var (temporarily holding it in setWorkouts)
                setWorkouts(logData)
                console.log(logData)
            })
    }
    
    //editUpdateWorkout has a simple job--updates our workoutToUpdate state variable based upon the input to this function
    
    const editUpdateWorkout = (workout) => {
        setWorkoutToUpdate(workout);
        console.log(workout);
    }
    
    //updateOn and updateOff will be used to toggle our WorkoutEdit display.  updateOn will be passed a prop to WorkoutTable, which will use the function when the user clicks on an Update button.  updateOff will be used by WorkoutEdit when we have completed or cancelled the workout edit process.
    const updateOn = () => {
        setUpdateActive(true);
    }
    
    const updateOff = () => {
        setUpdateActive(false);
    }
    
    //Remember that a useEffect with an optional second argument of an empty array will call whatever callback we give the useEffect function only once--as the component initially loads.  This is perfect for what we're trying to do
    useEffect(() => {
        fetchWorkouts();
    }, [])
    
    return (
        <Container>
            <Row>
                <Col md="3">
                    <WorkoutCreate
                        fetchWorkouts={fetchWorkouts}
                        token={props.token}/>
                </Col>
                <Col md="9">
                    <WorkoutTable
                        workouts={workouts}
                        editUpdateWorkout={editUpdateWorkout}
                        updateOn={updateOn}
                        fetchWorkouts={fetchWorkouts}
                        token={props.token}
                        />
                </Col>
                {updateActive ? <WorkoutEdit 
                    workoutToUpdate={workoutToUpdate}
                    updateOff={updateOff}
                    token={props.token}
                    fetchWorkouts={fetchWorkouts}
                /> : <></>}
            </Row>
</Container>
      //updateActive is our state boolean variable.  It represents if our WorkoutEdit component should be displaying or not.  Using a ternary, if the updateActive is true, we display our WorkoutEdit component with props involving the workout we'll update, the updateOff function to turn stop display of WorkoutEdit, our token to access guarded routes on the backend, and fetchWorkouts to update WorkoutTable when we've finished editing a single workout.  If updateActive is false, we display empty elements (nothing!)
    );  
};


export default WorkoutIndex;