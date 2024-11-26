import React from 'react';
import './login.css';
import { useState } from 'react';


// * put email and password entered onto the server if user does not exist * //


export function Login() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    const [usernameTyped, setUsernameTyped] = useState(localStorage.getItem('typedUsername') || '');
    const [passwordTyped, setPasswordTyped] = useState(localStorage.getItem('typedPassword') || '');
    const [confirmPasswordTyped, setConfirmPasswordTyped] = useState('');
    const [generatedLink, setGeneratedLink] = useState(localStorage.getItem('generatedLink') || '');

    async function createAccount() {
        // demand a response given the provided data to the server
        // 'fetch' sends a request and the response is stored in 'response'
        if (passwordTyped === confirmPasswordTyped && passwordTyped && usernameTyped && confirmPasswordTyped) {
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
        
            if (!response.ok) { // In this code, response.ok is a boolean property that checks if the HTTP response status code falls within the successful range (200-299) - AI
                alert("User already exists!");
                return false;
            }

            if (response.ok) {
                setIsLoggedIn(true);
                setIsCreatingAccount(false);
                localStorage.setItem("isLoggedIn", "true");
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
            localStorage.setItem("isLoggedIn", "true");
            return;
        }
    }

    // const handleCreateFinishClick = async () => {
        
    //     if (passwordTyped === confirmPasswordTyped && passwordTyped && usernameTyped && confirmPasswordTyped) {
    //         await createAccount(usernameTyped, passwordTyped);
    //         // if (success) {
    //         //     setIsLoggedIn(true);
    //         //     setIsCreatingAccount(false);
    //         //     localStorage.setItem("isLoggedIn", "true");
    //         // }
    //     } else {
    //         alert("Passwords do not match or one entry is empty!");
    //     }
    // }

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
        localStorage.setItem("isLoggedIn", "false");
        localStorage.setItem("typedUsername", '');
        localStorage.setItem("typedPassword", '');
    }

    function generateRandomLink() {
        let link = "";

        for (let i = 0; i < 10; i++) {
            const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            link += alphabet[Math.floor(Math.random() * alphabet.length)];
        }

        link = "https://" + link + ".psbhrfront.click/";
        
        return link;
    }

    const handleLinkGeneration = () => {
        let newLink = "";
        newLink = generateRandomLink();
        setGeneratedLink(newLink);
        localStorage.setItem("generatedLink", newLink);
    }

    const username = "jimmethy";
    const password = "test123";

    const handleLoginChange = (e) => {
        const {id, value} = e.target;
        switch (id) {
            case "usernameInput":
                setUsernameTyped(value);
                localStorage.setItem("typedUsername", value);   
                break;
            case "passwordInput":
                setPasswordTyped(value);
                localStorage.setItem("typedPassword", value);   
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
                            <h2 className='h2 text-secondary mt-3'>Welcome!</h2>
                            <button type="button" className="btn btn-outline-secondary" style={{ marginLeft: "5px" }} onClick={handleLogoutClick}>Logout</button>
                            <button type="button" className="btn btn-outline-secondary" style={{ marginLeft: "5px" }} onClick={handleLinkGeneration}>Generate Link</button>
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