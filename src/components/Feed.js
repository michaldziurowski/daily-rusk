import React from 'react';

import { getJoke, getComic, FEED_TYPE_JOKE } from '../utils/ruskapi';
import JokeFeedItem from './JokeFeedItem';
import ComicFeedItem from './ComicFeedItem';

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feed: [],
        };
        this.jokesInterval = null;
        this.comicInterval = null;

        this.addJoke = this.addJoke.bind(this);
        this.addComic = this.addComic.bind(this);
    }

    componentWillMount() {
        this.jokesInterval = setInterval(this.addJoke, 5000);
        this.comicInterval = setInterval(this.addComic, 7000);
    }

    componentWillUnmount() {
        clearInterval(this.jokesInterval);
        clearInterval(this.comicInterval);
    }

    addJoke() {
        return getJoke()
            .then(newJoke => this.setState({ feed: [...this.state.feed, newJoke] }));
    }

    addComic() {
        return getComic()
            .then(newComic => this.setState({ feed: [...this.state.feed, newComic] }));
    }

    render() {
        return (
            <div className="feed">
                {this.state.feed.map((f, i) => (f.type === FEED_TYPE_JOKE ?
                    // yes i know ...
                    // eslint-disable-next-line
                    <JokeFeedItem joke={f.content.joke} key={`${i}_${f.content.id}`} /> :
                    // eslint-disable-next-line
                    <ComicFeedItem comicUrl={f.content} key={`${i}_${f.content}`} />))
                }
            </div>);
    }
}

export default Feed;
