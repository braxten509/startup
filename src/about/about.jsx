import React from 'react';
import './about.css';

export function About() {
  return (
    <main className="min-vh-100 mb-5">
        <div className="d-flex justify-content-center m-3">
            <p className="text-secondary">
                    Braxten Chenay is a Software Engineering Student studying<br/>
                    at BYU! If you have any questions about the software, feel free to<br/>
                    reach out at braxten5@byu.edu.
            </p>
        </div>
        <div className="d-flex justify-content-center m-3">
            <img className="rounded border border-3" alt="Image of Braxten Chenay" src="../../braxtenchenay.jpg" width="400" height="500" />
        </div>
    </main>
  );
}  