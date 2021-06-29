import React from 'react';
import { useState, useEffect } from 'react';
import {
    Button, Form, FormGroup, Label, Input
} from 'reactstrap';

const WorkoutCreate = (props) => {

    const [description, setDescription] = useState('');
    const [definition, setDefinition] = useState("");
    const [result, setResult] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/log/", {
            method: "POST",
            body: JSON.stringify({
                log: {
                    description: description,
                    definition: definition,
                    result: result
                }}),
            headers: new Headers(
                {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${props.token}`
                })
        })
            .then((res) => res.json())
                .then((logData) => {
                    console.log(logData);
                    //reset all the state variables so the user can input a fresh workout to be posted.
                    setDescription("");
                    setDefinition("");
                    setResult("");
                    props.fetchWorkouts();
                })}
    return (
        <div>
        <h3>
            Log a Workout
        </h3>
            <Form
            onSubmit={handleSubmit}>
                <FormGroup>
                    <label htmlForm="description" />
                    <Input
                        onChange={(e) => setDescription(e.target.value)}
                        name="description"
                        value={description} />
                </FormGroup>
                <br />
                <FormGroup>
                    <label htmlForm="definition" />
                    <Input
                        type="select"
                        name="definition"
                        onChange={(e) => setDefinition(e.target.value)}
                        value={definition}>
                    <option value="Time">Time</option>
                    <option value="Weight">Weight</option>
                        <option value="Distance">Distance</option>
                        </Input>
                </FormGroup>
                    
                <br />
                   <FormGroup>
                    <label htmlForm="result" />
                    <Input
                        onChange={(e) => setResult(e.target.value)}
                        name="result"
                        value={result} />
                </FormGroup>
                <br />
                <Button
                    type="submit">
                Submit
                </Button>
                <br />
                 <br />
        </Form>
</div>       
/*These callback functions accept the user event and update our state based upon the target.value*/
    );
};

export default WorkoutCreate;

