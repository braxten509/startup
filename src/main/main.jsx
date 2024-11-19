import React, { useState } from "react";
import "./main.css";
import { Calendar } from "./calendar.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from "react";


export function Main() {
    const [startDate, setStartDate] = useState(new Date());
    const [link, setLink] = useState(localStorage.getItem("link") || "");

    const CustomInput = forwardRef(
      ({ value, onClick, className }, ref) => (
        <button className={className} onClick={onClick} ref={ref}>
          {value}
        </button>
      ),
    );

    const handleLinkChange = (e) => {
        const {id, value} = e.target;
        setLink(value);
        localStorage.setItem("link", value);   
    }

  return (
    <main className="mb-5">
        <div className="d-flex justify-content-center m-3">
            <div className="input-group center-link">
                <span className="input-group-text text-secondary">Calendar link</span>
                <input type="text" className="form-control text-secondary" placeholder="https://mycalendar.psbhrfront.click/" value={link} onChange={handleLinkChange}/>
            </div>
        </div>
            
        <div className="d-flex justify-content-center m-3">
            <div className="btn-group border border-3 " role="group">
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} customInput={<CustomInput className="btn custom-input text-secondary" />}/>
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
                        <Calendar date={startDate.toDateString()} link={link}/>
                    </tbody>
                </table>
            </div>
        </div>
    </main>
  );
}