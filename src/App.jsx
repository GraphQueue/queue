
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
  //console.log(user)

  function hideRoute() {

    if (user !== null) { // if logged in
      let signupLink = document.querySelector('.signup'),
        loginLink = document.querySelector('.login');
      // console.log(link)
      signupLink.style.display = 'none'
      loginLink.style.display = 'none'

      let favlink = document.querySelector('.fav');
      //favlink.style.display = 'none';
      favlink.innerHTML = `${user}'s Favorites`;

      let signoutLink = document.querySelector('.signout');
      signoutLink.innerHTML = 'Signout';
      signoutLink.style.color = 'red'


    }
  }
  return (
    <Router>
      <Navbar bg="light" expand="lg" fixed="top" className="navbar" onLoad={hideRoute()}>
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
            <Nav.Link as={Link} to="/signup" className="nav-link signup">
              Signup
              </Nav.Link>
            <Nav.Link as={Link} to="/login" className="nav-link login">
              Login
              </Nav.Link>
            <Nav.Link as={Link} to="/favorites" className="nav-link fav" >
              {/* <span className="username">{user}'s </span>Favorites */}
            </Nav.Link>
            <Nav.Link as={Link} to="/" className="nav-link signout" onClick={() => { window.location.reload() }}>
              {/* <span className="username">{user}'s </span>Favorites */}

            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path="/" render={(props) => <MainContainer {...props} user={user} />} />
        <Route path="/signup" render={(props) => <SignUpPage {...props} user={user} setUser={setUser} />} />
        <Route path="/login" render={(props) => <LoginPage {...props} user={user} setUser={setUser} />} />
      </Switch>
    </Router >

  );
}


export default App;
