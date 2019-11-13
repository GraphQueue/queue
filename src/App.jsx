
import React, { Component } from 'react';
import MainContainer from './containers/MainContainer.jsx';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import LoginPage from './components/LoginPage.jsx';
import SignUpPage from './components/SignUpPage.jsx';
import './css/styles.css'
import { Navbar, Nav } from 'react-bootstrap';


class App extends Component {

  render() {
    return (
      <Router>
        <Navbar bg="light" expand="lg" className="navbar">
          <Navbar.Brand as={Link} to="/">
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
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/" component={MainContainer} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/login" component={LoginPage} />
        </Switch>
      </Router >

    );
  }
}


export default App;
