import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div className="mb-0">
      <header>
        <nav className="navbar navbar-expand navbar-color">
          <div className="container-fluid">
            <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
              <ul className="navbar-nav align-items-center">
                <li className="nav-item">
                  <a className="navbar-brand gradient-text" href="index.html">Calenshare</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link link-primary active" href="index.html">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link link-primary active" href="https://github.com/braxten509/startup">Github</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link link-primary active" href="login.html">My Calendars</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link link-primary active" href="about.html">About the author</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main>App components go here</main>

      <footer className="sticky-bottom footer-bg pb-0 mb-0">
        <hr className="mt-0" />
        <div className="d-flex justify-content-center">
          <p className="text-center mb-3 text-secondary">Copyright Braxten Chenay 2024</p>
        </div>
      </footer>
    </div>
  );
}