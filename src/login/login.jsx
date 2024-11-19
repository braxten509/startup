import React from 'react';
import './login.css';
import { useState } from 'react';

export function Login() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [usernameTyped, setUsernameTyped] = useState(localStorage.getItem('typedUsername') || '');
    const [passwordTyped, setPasswordTyped] = useState(localStorage.getItem('typedPassword') || '');
    const [generatedLink, setGeneratedLink] = useState(localStorage.getItem('generatedLink') || '');

    const handleLoginClick = () => {
        if (usernameTyped === username && passwordTyped === password) {
            setIsLoggedIn(true);
            localStorage.setItem("isLoggedIn", "true");
        }
    }

    const handleLogoutClick = () => {
        setIsLoggedIn(false);
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
            link = link + alphabet[Math.floor(Math.random() * alphabet.length)];
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
                    ) : (
                        <div class="btn-group">
                            <div className="input-group center-link me-1 mb-1">
                                <span className="input-group-text text-secondary">Username</span>
                                <input type="text" className="form-control" placeholder="example@site.com" id="usernameInput" value={usernameTyped} onChange={handleLoginChange}/>
                            </div>
                            <div className="input-group center-link mb-1">
                                <span className="input-group-text text-secondary">Password</span>
                                <input type="password" className="form-control" placeholder="hello123" id="passwordInput" value={passwordTyped} onChange={handleLoginChange}/>
                            </div>
                            <button type="button" className="btn btn-primary" style={{ marginLeft: "5px" }} onClick={handleLoginClick}>Login</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div className="rounded border border-3 mt-3">
                    <table className="table links m-0 text-secondary text-center">
                        <thead>
                            <tr>
                                <th className="thead-bg">My Calendar Links</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>{isLoggedIn ? generatedLink : ''}</td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        </main>
    );
}  