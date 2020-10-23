import React from 'react';
// import Signup from './pages/Signup/Signup.page';
// import Login from './pages/Login/Login.page';
import './App.css';
import Profile from './pages/Profile/Profile.page';

function App() {
  // const profile = {
  //   name
  // }
  return (
    <div className="App">
      {/* <Signup/>
      <Login/> */}
      <Profile name={"Prayas Gupta"} age={9} />
    </div>
  );
}

export default App;
