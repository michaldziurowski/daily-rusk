import localforage from 'localforage';

const FEED_CACHE_NAME = 'feed';

export const getCachedFeed = () => localforage.getItem(FEED_CACHE_NAME).then(value => value || []);

export const cacheFeedItem = feedItem => localforage.getItem('feed').then((value) => {
    const newValue = value ? [...value] : [];
    if (value === null) {
        return localforage.setItem(FEED_CACHE_NAME, [feedItem]);
    }

    if (value.length === 5) {
        newValue.shift();
        return localforage.setItem(FEED_CACHE_NAME, [...newValue, feedItem]);
    }

    newValue.push(feedItem);
    return localforage.setItem(FEED_CACHE_NAME, newValue);
});

export const clearMediaCache = () => {
    // return promise which resolve when caching is finished
};
