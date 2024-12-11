import React from 'react';
import './login.css';
import { useState } from 'react';


// * put email and password entered onto the server if user does not exist * //


export function Login() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    const [usernameTyped, setUsernameTyped] = useState('');
    const [passwordTyped, setPasswordTyped] = useState('');
    const [confirmPasswordTyped, setConfirmPasswordTyped] = useState('');
    const [generatedLink, setGeneratedLink] = useState('');

    const [user, setUser] = useState('');

    async function createAccount() {
        // demand a response given the provided data to the server
        // 'fetch' sends a request and the response is stored in 'response'
        if (passwordTyped && usernameTyped && confirmPasswordTyped && passwordTyped === confirmPasswordTyped) {
            const response = await fetch(`/api/auth/create`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ // fetch can ONLY send strings, not objects. So a string array is created.
                    email: usernameTyped,
                    password: confirmPasswordTyped
                })
            }); 
        
            if (!response?.ok) { // In this code, response.ok is a boolean property that checks if the HTTP response status code falls within the successful range (200-299) - AI
                alert("User already exists!");
                return false;
            }

            if (response?.ok) {
                setIsLoggedIn(true);
                setIsCreatingAccount(false);
              }

        } else {
            alert("Passwords do not match or one entry is empty!");
        }
    }

    async function handleLoginClick() {
        // demand a response given the provided data to the server
        // 'fetch' sends a request and the response is stored in 'response'
        const response = await fetch(`/api/auth/login`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ // fetch can ONLY send strings, not objects. So a string array is created.
                email: usernameTyped,
                password: passwordTyped
            })
        }); 
    
        if (!response.ok) { // In this code, response.ok is a boolean property that checks if the HTTP response status code falls within the successful range (200-299) - AI
            alert("Invalid credentials!");
            return;
        }

        if (response.ok) {
            setIsLoggedIn(true);
            setIsCreatingAccount(false);
            setUser(usernameTyped);
            handleGetLink(usernameTyped);
            return;
        }
    }

    const handleCreateClick = () => {
        setIsCreatingAccount(true);
    }

    const handleCreateCancelClick = () => {
        setIsCreatingAccount(false);
        handleLogoutClick();
    }

    const handleLogoutClick = () => {
        setIsLoggedIn(false);
        setIsCreatingAccount(false);
        setUsernameTyped('');
        setPasswordTyped('');
        setUser('');
        setGeneratedLink('');
        localStorage.setItem("isLoggedIn", "false");
        localStorage.setItem("typedUsername", '');
        localStorage.setItem("typedPassword", '');
        localStorage.setItem("user", '');
        localStorage.setItem("generatedLink", '');
    }

    async function handleGetLink(email) {
        const response = await fetch(`/api/link/get?email=${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          const data = await response.json();

          if (response.ok) {
            setGeneratedLink(data.link.link);
          }
    }

    async function handleLinkGeneration(email) {
        const response = await fetch('/api/link/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        });

        const data = await response.json();

        if (response.ok) {
            setGeneratedLink(data.link);
        } else {
            alert('Failure :(');
        }
    }

    const handleLoginChange = (e) => {
        const {id, value} = e.target;
        switch (id) {
            case "usernameInput":
                setUsernameTyped(value);
                break;
            case "passwordInput":
                setPasswordTyped(value);
                break;
            case "confirmPasswordInput":
                setConfirmPasswordTyped(value);
                break;
        }
    }

    return (
        <main className="min-vh-100 mb-5">
            <div className="d-flex justify-content-center m-1">
                <div>
                    {isLoggedIn ? (
                        <div className='text-center'>
                            <h2 className='h2 text-secondary mt-3'>Welcome {user}!</h2>
                            <button type="button" className="btn btn-outline-secondary" style={{ marginLeft: "5px" }} onClick={handleLogoutClick}>Logout</button>
                            <button type="button" className="btn btn-outline-secondary" style={{ marginLeft: "5px" }} onClick={() => handleLinkGeneration(user)}>Generate Link</button>
                        </div>
                    ) : isCreatingAccount ? (
                        <div className="container">
                            <div className="input-group center-link me-1 mb-2 mt-3">
                                <span className="input-group-text text-secondary" style={{ width: "155px"}}>Email</span>
                                <input type="text" className="form-control" placeholder="example@site.com" id="usernameInput" value={usernameTyped} onChange={handleLoginChange}/>
                            </div>
                            <div className="input-group center-link mb-2">
                                <span className="input-group-text text-secondary" style={{ width: "155px"}}>New Password</span>
                                <input type="password" className="form-control" placeholder="hello123" id="passwordInput" value={passwordTyped} onChange={handleLoginChange}/>
                            </div>
                            <div className="input-group center-link mb-2">
                                <span className="input-group-text text-secondary" style={{ width: "155px"}}>Confirm Password</span>
                                <input type="password" className="form-control" placeholder="hello123" id="confirmPasswordInput" value={confirmPasswordTyped} onChange={handleLoginChange}/>
                            </div>
                            <div className="btn-group">
                                <button type="button" className="btn btn-primary" style={{marginRight: "4px", width: "200px"}} onClick={() => createAccount()}>Create Account</button>
                                <button type="button" className="btn btn-danger" style={{width: "195px"}} onClick={handleCreateCancelClick}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="container">
                                <div className="input-group center-link me-1 mb-2 mt-3">
                                    <span className="input-group-text text-secondary" style={{ width: "155px"}}>Email</span>
                                    <input type="text" className="form-control" placeholder="example@site.com" id="usernameInput" value={usernameTyped} onChange={handleLoginChange}/>
                                </div>
                                <div className="input-group center-link mb-2">
                                    <span className="input-group-text text-secondary" style={{ width: "155px"}}>Password</span>
                                    <input type="password" className="form-control" placeholder="hello123" id="passwordInput" value={passwordTyped} onChange={handleLoginChange}/>
                                </div>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-primary" style={{marginRight: "4px", width: "195px"}} onClick={() => handleLoginClick()}>Login</button>
                                    <button type="button" className="btn btn-primary" style={{width: "200px"}} onClick={handleCreateClick}>Create Account</button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="d-flex justify-content-center">
                {isLoggedIn ? (
                    <div className="rounded border border-3 mt-3">
                    
                        <table className="table links m-0 text-secondary text-center">
                            <thead>
                                <tr>
                                    <th className="thead-bg">My Calendar Links</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>{generatedLink}</td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </main>
    );
}  