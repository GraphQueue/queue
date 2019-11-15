
import React, { Component, useState } from 'react';
import MainContainer from './containers/MainContainer.jsx';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import LoginPage from './components/LoginPage.jsx';
import SignUpPage from './components/SignUpPage.jsx';
import Favorites from './components/Favorites.jsx';
import './css/styles.css'
import { Navbar, Nav } from 'react-bootstrap';


const App = () => {

  const [user, setUser] = useState(null);

  function updateUser(username) {
    setUser(username);
  }


  return (
    <Router>
      <Navbar bg="light" expand="lg" fixed="top" className="navbar">
        <Navbar.Brand as={Link} to="/">
          <img className="logo" src="https://image.flaticon.com/icons/png/512/876/876569.png" alt="" />
          <span className="brand">GraphQueue</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">

            <Nav.Link as={Link} to="/" className="nav-link" >
              Home
              </Nav.Link>
            <Nav.Link as={Link} to="/signup" className="nav-link">
              Signup
              </Nav.Link>
            <Nav.Link as={Link} to="/login" className="nav-link">
              Login
              </Nav.Link>
            <Nav.Link as={Link} to="/favorites" className="nav-link">
              Favorites
              </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path="/" render={(props) => <MainContainer {...props} user={user} />} />
        <Route path="/signup" render={(props) => <SignUpPage {...props} user={user} setUser={setUser} />} />
        <Route path="/login" render={(props) => <LoginPage {...props} user={user} setUser={setUser} />} />
        <Route path="/favorites" render={(props) => <Favorites {...props} user={user} />} />
      </Switch>
    </Router >

  );
}


export default App;
