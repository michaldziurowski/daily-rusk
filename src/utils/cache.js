import localforage from 'localforage';

import { FEED_TYPE_COMIC } from '../utils/ruskapi';

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

export const clearMediaCache = () => localforage.getItem('feed').then((value) => {
    const comicUrls = value ? value.filter(f => f.type === FEED_TYPE_COMIC).map(c => c.content) : [];
    return caches.open('dailyRusk-media').then(cache =>
        cache.keys()
            .then(keys => Promise.all(keys.filter(k => comicUrls.indexOf(k.url) === -1).map(k => cache.delete(k)))));
});