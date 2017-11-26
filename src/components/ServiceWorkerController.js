import React from 'react';

import registerServiceWorker from '../utils/swregistration';

class ServiceWorkerController extends React.Component {
    componentDidMount() {
        registerServiceWorker();
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default ServiceWorkerController;
