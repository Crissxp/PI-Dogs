import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './pages/home/home'
import LandingPage from './pages/landingPage/landingPage'

import Details from './pages/deteails/details';
import Create from './pages/create/create';
import AboutMe from './pages/aboutMe/aboutMe';
 


function App() {

  return (
    <BrowserRouter>
      <div className="App">
    < Route exact path='/' component= {LandingPage} />
    < Route exact path='/home' component= {Home}/>
    < Route exact path="/details/:id" component={Details} />
    < Route exact path="/create" component={Create} />
    < Route exact path="/AboutMe" component={AboutMe}/>
     </div>
    </BrowserRouter>
  );
}


export default App;
