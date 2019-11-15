import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
const LoginPage = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);


    // add function POST to /dbRouter/login
    function postToLogin() {
        axios.post(`/dbRouter/login`, { username, password })
            .then(res => {
                const username = res.data.username;
                props.setUser(username);
                setRedirect(true);
            })
    }

    if (redirect) return <Redirect to='/' />;

    return (
        <div className="container bg1">
            <h1>Log In</h1>
            <form action="/dbRouter/login" method="POST" className="flex fd-col">
                username: <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required /><br />
                password: <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
                <Button id="signup" variant="dark" onClick={postToLogin} className="a-btn">Login</Button>
                {/* <input id="signup" type="submit" value="Login" /> */}
            </form>
            <a href="/signup" >
                <Button variant="link" className="auth-btn">Sign up here.</Button>
            </a>
        </div>
    );
}

export default LoginPage;