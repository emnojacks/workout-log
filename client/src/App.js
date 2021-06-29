import React, { useEffect, useState } from 'react';
import Sitebar from './home/Navbar';
import Auth from './auth/Auth';
import WorkoutIndex from './workouts/WorkoutIndex'

function App() {
  //our sessionToken will change during the course of our app running (it will start empty, be given a value upon logging in, then emptied upon logout), we also use the second argument of useState, which allows us to change our sessionToken state variable.
  const [sessionToken, setSessionToken] = useState("");
  
  
//put session auth here because it will funnell down to all children 
  //updates our sessionToken state variable if Chrome has saved a sessionToken in localStorage.  Because we pass an empty array as a second argument, there is no change our effect is tracking to re-run later, so the effect runs only upon initial component load.
useEffect(() => {
  //returns value of value associated wtih givenkey or null if none exists
  if (localStorage.getItem('token')) {
    setSessionToken(localStorage.getItem('token'));
  }
}, [])

  //takes in a token and saves it two places--in our localStorage and in our state variable, sessionToken. localStorage is a secure place to store this data, and will persist as long as our browser is open.  The state variable allows child components to quickly access the sessionToken for use.
const updateToken = (newToken) => {
  //sets value of token to the value of newToken
  //if token does not exists, creates a new key value pair 
  localStorage.setItem('token', newToken);
  //takes newToken and assigns it to session token
  setSessionToken(newToken);
  console.log(sessionToken);
};
  
  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
  }
  
  const protectedViews = () => {
    return (
      //checks to see if our sessionToken state variable matches the token property in localStorage
      sessionToken === localStorage.getItem('token') ?
        // If the two match (which can only happen when they store the same sessionToken string), then the function fires off the WorkoutIndex component
        <WorkoutIndex
          token={sessionToken} />
        //Otherwise, this function will return our Auth component so the user can attempt to grab a sessionToken through our server
        : <Auth
          updateToken={updateToken} />
    )
  }
  
  return (
    <div>
      <Sitebar
      clickLogout={clearToken}
      />
  
      {/*<Auth
        //passing updateToken as prop so it can be 
        //used by child of App (auth)
        updateToken={updateToken} />}*/}

     {protectedViews()}

     
    </div>
  )
};

export default App;

//The setSessionToken method we get through array destructuring of our useState method is only available in App.js.  Therefore, our updateToken method needs to also be in App.js.  Another great reason for writing it here is that we don't want duplicate code--better to write updateToken once in App.js and pass it were it's needed