import React from 'react';
import './login.css';

export function Login() {
  return (
    <main class="min-vh-100 mb-5">
            <div class="d-flex justify-content-center m-3">
                <div class="input-group center-link me-1">
                    <span class="input-group-text text-secondary">Username</span>
                    <input type="text" class="form-control" placeholder="example@site.com" />
                </div>
                <div class="input-group center-link">
                    <span class="input-group-text text-secondary">Password</span>
                    <input type="password" class="form-control" placeholder="hello123" />
                </div>
            </div>

            <div class="d-flex justify-content-center">
                <div class="rounded border border-3 mt-3">
                    <table class="table links m-0 text-secondary text-center">
                        <thead>
                            <tr>
                                <th class="thead-bg">My Calendar Links</th>
                            </tr>
                        </thead>
    
                        <tbody>
                            <tr>
                                <td>https://example.com</td>
                            </tr>
                        </tbody>
                        
                    </table>
                </div>
            </div>
        </main>
  );
}  