import React from 'react';

import NewServiceWorkerPopup from './NewServiceWorkerPopup';
import { registerServiceWorker, registerControllerChange, onUpdateClicked } from '../utils/swregistration';

class ServiceWorkerController extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newVersion: false,
            worker: null,
        };

        this.onNewVersion = this.onNewVersion.bind(this);
    }

    componentDidMount() {
        registerServiceWorker(this.onNewVersion);
        registerControllerChange();
    }

    onNewVersion(worker) {
        this.setState({ newVersion: true, worker });
    }

    render() {
        return (
            <div>
                {this.props.children}
                {this.state.newVersion && <NewServiceWorkerPopup onUpdate={() => onUpdateClicked(this.state.worker)} />}
            </div>
        );
    }
}

export default ServiceWorkerController;
