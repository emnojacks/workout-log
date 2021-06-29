import React from 'react';
import { useState } from 'react';
import { Modal, ModalBody, ModalHeader, Form, FormGroup, Input, Label, Button } from 'reactstrap';

const WorkoutEdit = (props) => {

    const [editDesc, setEditDesc] = useState(props.workoutToUpdate.description);
    const [editDef, setEditDef] = useState(props.workoutToUpdate.definition);
    const [editRes, setEditRes] = useState(props.workoutToUpdate.result)
    
    const workoutUpdate = (event, workout) => {
        event.preventDefault();
        fetch(`http://localhost:3000/log/${props.workoutToUpdate.id}`, {
            method: "PUT",
            body: JSON.stringify({
                log:
                {
                    description: editDesc,
                    definition: editDef,
                    result: editRes
                }
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${props.token}`
            })
        })
            .then((res) => {
                props.fetchWorkouts();
                props.updateOff();
            })
            .catch((error) => {
                console.log("Failed to update log")
            })
    }
    
    return (
        <div>
            <Modal isOpen={true}>
                <ModalHeader>Edit Your Workout Log</ModalHeader>
                <ModalBody>
                    <Form onSubmit={workoutUpdate}>
                        <FormGroup>
                            <Label htmlFor="result">Edit Result: </Label>
                            <Input
                                name="result"
                                value={editRes}
                                onChange={(e) => setEditRes(e.target.value)}>
                            </Input>
                        </FormGroup>
                         <br />
                        <FormGroup>
                            <Label htmlFor="description">Edit Description: </Label>
                        <Input
                                name="description"
                                value={editDesc}
                                onChange={(e) => setEditDesc(e.target.value)}>
                        </Input>
                        </FormGroup>
                         <br />
                        <FormGroup>
                            <Label htmlFor="definition">Edit Definition: </Label>
                            <Input
                                type="select"
                                name="definition"
                                value={editDef}
                                onChange={(e) => setEditDef(e.target.value)}>
                                <option value="Time">Time</option>
                                <option value="Weight">Weight</option>
                                <option value="Distance">Distance</option>
                         </Input>
                        </FormGroup>
                        <br />
                        <Button
                            type="submit"
                        >Update your workout</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );

};

export default WorkoutEdit;