const trackInstalling = (worker, onNewVersion) => {
    worker.addEventListener('statechange', () => {
        if (worker.state === 'installed') {
            onNewVersion(worker);
        }
    });
};

export const registerServiceWorker = (onNewVersion) => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js').then((registration) => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);

                if (!navigator.serviceWorker.controller) {
                    return;
                }

                if (registration.waiting) {
                    onNewVersion(registration.waiting);
                    return;
                }

                if (registration.installing) {
                    trackInstalling(registration.installing, onNewVersion);
                    return;
                }

                registration.addEventListener('updatefound', () => {
                    trackInstalling(registration.installing, onNewVersion);
                });
            }, (err) => {
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
};

export const registerControllerChange = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            window.location.reload();
        });
    }
};

export const onUpdateClicked = (worker) => {
    worker.postMessage({ skipWaiting: true });
};
