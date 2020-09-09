import React from 'react';

import { getJoke, getComic, FEED_TYPE_JOKE } from '../utils/ruskapi';
import { getCachedFeed, cacheFeedItem, clearMediaCache } from '../utils/cache';
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
    this.cacheAndState = this.cacheAndState.bind(this);
  }

  componentWillMount() {
    getCachedFeed().then((feed) => {
      this.setState({ feed });
      this.jokesInterval = setInterval(this.addJoke, 3000);
      this.comicInterval = setInterval(this.addComic, 7000);
    });
  }

  componentWillUnmount() {
    clearInterval(this.jokesInterval);
    clearInterval(this.comicInterval);
  }

  cacheAndState(feedItem) {
    if (feedItem.type) {
      return cacheFeedItem(feedItem).then(() =>
        this.setState({ feed: [...this.state.feed, feedItem] })
      );
    }

    return null;
  }

  addJoke() {
    return getJoke().then((newJoke) => this.cacheAndState(newJoke));
  }

  addComic() {
    return getComic()
      .then((newComic) => this.cacheAndState(newComic))
      .then(() => clearMediaCache());
  }

  render() {
    return (
      <div className="feed">
        {this.state.feed.map((f, i) =>
          f.type === FEED_TYPE_JOKE ? (
            // yes i know ...
            // eslint-disable-next-line
            <JokeFeedItem joke={f.content.joke} key={`${i}_${f.content.id}`} />
          ) : (
            // eslint-disable-next-line
            <ComicFeedItem comicUrl={f.content} key={`${i}_${f.content}`} />
          )
        )}
      </div>
    );
  }
}

export default Feed;
