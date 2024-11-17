import React from 'react';
import './main.css';

export function Main() {
  return (
    <main className="mb-5">
        <div className="d-flex justify-content-center m-3">
            <div className="input-group center-link">
                <span className="input-group-text text-secondary">Calendar link</span>
                <input type="text" className="form-control" placeholder="https://mycalendar.psbhrfront.click/" />
            </div>
        </div>
            
        <div className="d-flex justify-content-center m-3">
            <div className="btn-group" role="group">
                <button type="button" className="btn btn-outline-secondary btn-sm"> &#60; </button>
                <button type="button" className="btn btn-outline-secondary btn-sm"> Sept. 11th </button>
                <button type="button" className="btn btn-outline-secondary btn-sm"> &#62; </button>
            </div>
        </div>
            
        <br/>
        <div className="d-flex justify-content-center">
            <div className="rounded border border-3">
                <table className="table-size table table-hover table-striped table-bordered text-center text-secondary m-0">
                    <thead>
                        <tr>
                            <th scope="col">Time</th>
                            <th scope="col">Events 1</th> 
                            <th scope="col">Events 2</th>
                            <th scope="col">Events 3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">6 AM</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">7 AM</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">8 AM</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">9 AM</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">10 AM</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">11 AM</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">12 PM</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">1 PM</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">2 PM</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">3 PM</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">4 PM</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">5 PM</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">6 PM</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">7 PM</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">8 PM</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">9 PM</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">10 PM</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row">11 PM</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </main>
  );
}