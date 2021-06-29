import React from 'react';
import { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const Login = (props) => {
    
    //Even though we could grab the values of these input fields without state variables, whenever manipulable information on your webpage is uncontrolled by React, it's an opportunity for bugs to arise in your program.
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        //if (username !== " " && password !== " ") {
        fetch("http://localhost:3000/user/login", {
            method: "POST",
            // including a  with our state information set as user
            //If your server is expecting information in this format:  and , then the above will work. 
            body: JSON.stringify(
                { user: { username: username, password: password } }),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
            .then((res) => res.json())
            .then((data) =>
                //takes the session token from the response and sets/passes it to the updatetoken object
            {
                props.updateToken(data.sessionToken);
                console.log("user logged in")
            })
            .catch((error) => {
            console.log(error.message)
            })
        
        //} else {
            //window.alert("Username and password are required.")
        //};
    };
    
    return (
        <div>
            <h1>Login</h1>
            
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    
                    <Label htmlFor="username">Username</Label>
                    <Input
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}     
                   />
                </FormGroup>
                
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </FormGroup>
            
                <Button type="submit"> Login </Button>
            </Form>
        </div>
    );
};

export default Login;