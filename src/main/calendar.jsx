import React from "react";
import { useState, useEffect } from "react";

export function Calendar({date, link}) {

    function Cell({cellId}) {
        const [showInput, setShowInput] = useState(false);

        const [cellName, setCellName] = useState(localStorage.getItem(`cellName-${cellId}`) || "");
        const [eventName, setEventName] = useState(localStorage.getItem(`name-${cellId}`) || "");
        const [eventDateAndTime, setEventDateAndTime] = useState(localStorage.getItem(`dateAndTime-${cellId}`) || "");
        const [eventLocation, setEventLocation] = useState(localStorage.getItem(`location-${cellId}`) || "");

        const handleCellClick = (e) => {
            setShowInput(true);
        }

        const handleButtonClick = (e) => { // e = event
            e.stopPropagation();
            setCellName(eventName);
            localStorage.setItem(`cellName-${cellId}`, eventName);
            setShowInput(false);
        }

        const handleInputChange = (e) => {
            const {id, value} = e.target;
            switch (id) {
                case "eventNameInput":
                    setEventName(value);
                    localStorage.setItem(`name-${cellId}`, value);
                    break;
                case "timeInput":
                    setEventDateAndTime(value);
                    localStorage.setItem(`dateAndTime-${cellId}`, value);
                    break;
                case "locationInput":
                    setEventLocation(value);
                    localStorage.setItem(`location-${cellId}`, value);
                    break;
            }
        }

        return (
            <td onClick={handleCellClick}>
                {showInput ? (
                    <>
                        <div className="container mb-3">
                            <div className="row">
                                <label htmlFor="eventNameInput" className="form-label mt-3">Event name</label>
                                <input type="text" className="form-control" id="eventNameInput" placeholder="Ball game" onClick="" value={eventName} onChange={handleInputChange}/>
                            </div>
                            <div className="row">
                                <label htmlFor="timeInput" className="form-label mt-3">Date & Time</label>
                                <input type="datetime-local" className="form-control" id="timeInput" value={eventDateAndTime} onChange={handleInputChange}/>
                            </div>
                            <div className="row">
                                <label htmlFor="locationInput" className="form-label mt-3">Location</label>
                                <input type="text" className="form-control" id="locationInput" placeholder="7th St Apt 8" value={eventLocation} onChange={handleInputChange}/>
                            </div>
                            <div className="row">
                                <button onClick={handleButtonClick} type="button" className="btn btn-success" style={{marginTop: "30px"}}>Done</button>
                            </div>
                        </div>
                    </>

                ) : (
                    `${cellName}`
                )}
            </td>
        );

    }

    function EventRow({rowId, time}) {
        return (
            <tr>
                <th scope="row">{time}</th>
                <Cell cellId={`${rowId}-1`}/>
                <Cell cellId={`${rowId}-2`}/>
                <Cell cellId={`${rowId}-3`}/>
            </tr>
        );
    }

    //render
    return (
        <>
            <EventRow rowId={`${date}-${link}-1`} time={"6 AM"}/>
            <EventRow rowId={`${date}-${link}-2`} time={"7 AM"}/>
            <EventRow rowId={`${date}-${link}-3`} time={"8 AM"}/>
            <EventRow rowId={`${date}-${link}-4`} time={"9 AM"}/>
            <EventRow rowId={`${date}-${link}-5`} time={"10 AM"}/>
            <EventRow rowId={`${date}-${link}-6`} time={"11 AM"}/>
            <EventRow rowId={`${date}-${link}-7`} time={"12 PM"}/>
            <EventRow rowId={`${date}-${link}-8`} time={"1 PM"}/>
            <EventRow rowId={`${date}-${link}-9`} time={"2 PM"}/>
            <EventRow rowId={`${date}-${link}-10`} time={"3 PM"}/>
            <EventRow rowId={`${date}-${link}-11`} time={"4 PM"}/>
            <EventRow rowId={`${date}-${link}-12`} time={"5 PM"}/>
            <EventRow rowId={`${date}-${link}-13`} time={"6 PM"}/>
            <EventRow rowId={`${date}-${link}-14`} time={"7 PM"}/>
            <EventRow rowId={`${date}-${link}-15`} time={"8 PM"}/>
            <EventRow rowId={`${date}-${link}-16`} time={"9 PM"}/>
            <EventRow rowId={`${date}-${link}-17`} time={"10 PM"}/>
            <EventRow rowId={`${date}-${link}-18`} time={"11 PM"}/>
        </>
    );
}