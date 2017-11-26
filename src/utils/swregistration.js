export const registerServiceWorker = (onNewVersion) => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js').then((registration) => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);

                /*
                    if there is no service worker controller then do nothing
                    if there is waiting service worker invoke onNewVersion pass worker as a parameter
                    if there is installing service worker attach to statechange event  and when state is installed then invoke onNewVersion pass worker as a parameter
                    attach to updatefound event of registration, do the same as above for installing
                */
            }, (err) => {
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
};

export const registerControllerChange = () => {
    // attach to controllerchange event of navigator.serviceworker, reload page when this event is fired
};

export const onUpdateClicked = (worker) => {
    // post message from service worker
};
