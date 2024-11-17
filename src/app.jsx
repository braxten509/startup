import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Main } from './main/main';
import { About } from './about/about';


export default function App() {
  return (
    <BrowserRouter>
      <div className="main-body mb-0">
        <header>
          <nav className="navbar navbar-expand navbar-color">
            <div className="container-fluid">
              <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
                <menu className="navbar-nav align-items-center">
                  <li className="nav-item">
                    <div className='navbar-brand gradient-text'>
                      Calenshare
                    </div>
                  </li>
                  <li className="nav-item">
                    <NavLink className='nav-link link-primary active' to='main'>
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className='nav-link link-primary active' to='https://github.com/braxten509/startup'>
                      Github
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className='nav-link link-primary active' to='login'>
                      My Calendars
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className='nav-link link-primary active' to='about'>
                      About the author
                    </NavLink>
                  </li>
                </menu>
              </div>
            </div>
          </nav>
        </header>

        <Routes>
          <Route path='/' element={<Main />} exact />
          <Route path='/main' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer className="sticky-bottom footer-bg pb-0 mb-0">
          <hr className="mt-0" />
          <div className="d-flex justify-content-center">
            <p className="text-center mb-3 text-secondary">Copyright Braxten Chenay 2024</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}