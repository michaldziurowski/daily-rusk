import React from 'react';

import Feed from './Feed';
import './App.css';

const App = () => (
    <div className="container">
        <div className="title"><img src="images/rusk_logo.png" alt="" /> Daily rusk</div>
        <Feed />
    </div>
);

export default App;
