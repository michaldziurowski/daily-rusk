export const FEED_TYPE_JOKE = 'joke';
export const FEED_TYPE_COMIC = 'comic';

export const getJoke = () => {
    const headers = new Headers();
    headers.append('Accept', 'application/json');

    const init = {
        method: 'GET',
        mode: 'cors',
        headers,
    };

    return fetch('https://icanhazdadjoke.com', init)
        .then(jokeResponse => jokeResponse.json())
        .then(joke => ({ type: FEED_TYPE_JOKE, content: joke }))
        .catch((err) => {
            console.log('Error while fetching joke: ', err);
            return err;
        });
};

export const getComic = () => {
    const headers = new Headers();
    headers.append('Accept', 'image/webp,image/apng,image/*,*/*;q=0.8');

    const init = {
        method: 'GET',
        mode: 'cors',
        headers,
    };

    const randomIndex = Math.floor(Math.random() * 14) + 1;
    const comicUrl = `https://daily-rusk-img.surge.sh/${randomIndex}.jpg`;
    // fetch image as a internet connection check
    return fetch(comicUrl, init)
        .then(() => ({ type: FEED_TYPE_COMIC, content: comicUrl }))
        .catch((err) => {
            console.log('Error while fetching comic: ', err);
            return err;
        });
};
