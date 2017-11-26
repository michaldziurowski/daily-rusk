import React from 'react';

import './NewServiceWorkerPopup.css';

const NewServiceWorkerPopup = ({ onUpdate }) => (
    <div className="new-sw-popup">
        <div className="message">New version is available.</div>
        <div>
            <button onClick={onUpdate}>Update</button>
        </div>
    </div>
);

export default NewServiceWorkerPopup;
