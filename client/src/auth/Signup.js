import { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';


//login and signup forms contain the same info, but differ only in their titles and the action they initiate with our server when a successful use account is made or processed.


const Signup = (props) => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
       // if (username !== " " && password !== " ") {
            fetch("http://localhost:3000/user/register", {
                method: "POST",
                // including a  with our state information set as user
                //If your server is expecting information in this format:  and , then the above will work. 
                body: JSON.stringify(
                    { user: { username: username, password: password } }),
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })
                .then((response) => response.json())
                .then((data) =>
                //takes the session token from the response and sets/passes it to the updatetoken object
                {
                    console.log(data);
                    props.updateToken(data.sessionToken)
                    console.log("new user signed up") })
        //} else {
           // window.alert("Username and password are required.")
        //};
    };
    
    return (
//Notice again, that we don't use parentheses within the curly braces, because we aren't calling the callback functions ourselves--that's handled by the onSubmit handler
<div>
<h1>Sign Up</h1>

   <Form onSubmit = {handleSubmit}>
                <FormGroup>
                    
                    <Label htmlFor="username">Username</Label>
                <Input
                    name="username"
                    //target is the target element of the event-in this case, the input
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                </FormGroup>
                
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                <Input
                    name="password"
                    //callback functions, being called within the onChange event handlers, are called with an 'event' object as an argument.  This is default behavior to any event handler.  Digging into these event objects let us grab hold of the input data the user has typed
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}/>
                </FormGroup>
            
                <Button type="submit"> Signup </Button>
            </Form>
            </div>
    );
};

export default Signup;