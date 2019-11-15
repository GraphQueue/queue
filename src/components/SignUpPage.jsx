import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
const SignUpPage = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    function postToSignup() {
        axios.post(`/dbRouter/signup`, { username, password })
            .then(res => {
                console.log(`res from POST to /signup`, res)
                const username = res.data.username;
                console.log("Res: ", res.data);
                props.setUser(username);
                setRedirect(true);
            })
    }

    if (redirect) return <Redirect to='/' />;
    return (
        <div className="container bg1">
            <h1>Sign Up</h1>
            <form action="/dbRouter/signup" method="POST" className="flex fd-col">
                username: <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required /><br />
                password: <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required /><br />
                <Button id="signup" variant="dark" onClick={postToSignup}>Sign up</Button>
            </form>
            <a href="/login">
                <Button variant="link" className="auth-btn">Login here.</Button>
            </a>
        </div>
    );

}

export default SignUpPage;