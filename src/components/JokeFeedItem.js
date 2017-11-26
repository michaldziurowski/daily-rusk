import React from 'react';

import './JokeFeedItem.css';

const JokeFeedItem = ({ joke }) => <div className="joke">{joke}</div>;

JokeFeedItem.displayName = 'JokeFeedItem';

export default JokeFeedItem;
