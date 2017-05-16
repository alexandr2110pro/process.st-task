import _cloneDeep from 'lodash/cloneDeep';

import { NamedState } from './state';


export class PersistableState extends NamedState {

    buildLSKey() {
        return `STATE__${this._statePath}`;
    }

    _initState() {
        reporterFactory(this)();
        this.setState(this._loadFromLS());
    }

    _loadFromLS() {
        const json = window.localStorage.getItem(this.buildLSKey()) || null;
        return json === null
            ? null
            : JSON.parse(json)['state'];
    }

    _updateFromGlobal() {
        super._updateFromGlobal();
        this._saveToLS();
    }

    _saveToLS() {
        return window.localStorage.setItem(this.buildLSKey(), this._toJSON());
    }

    _toJSON() {
        return JSON.stringify({ state: this.getState() || null });
    }
}


// ------------------------------------
// ------------------------------------
// ------------------------------------
// ------------------------------------
// ------------------------------------


/**
 * @param stateInstance
 * @return {function()}
 */
function reporterFactory(stateInstance) {
    let STATE_CHANGED     = stateInstance.ACTIONS.STATE_CHANGED;
    let STATE_INITIALIZED = stateInstance.ACTIONS.STATE_INITIALIZED;

    let publish   = stateInstance.publish.bind(stateInstance);
    let subscribe = stateInstance.subscribe.bind(stateInstance);
    let getState  = stateInstance.getState.bind(stateInstance);

    let initial      = getState();
    let createAction = (newState, publish) => {
        let state  = _cloneDeep(newState);
        let type   = STATE_INITIALIZED;
        let action = { type, state };

        return onPublish => {
            publish(action);
            onPublish(action);
        }
    };


    return () => {
        let unsub = subscribe(({ type }) => {

            let updated = getState();

            if (type === STATE_CHANGED && !angular.equals(updated, initial)) {

                createAction(updated, publish)((action) => {

                    console.debug(`---\nINIT: ${action.type}:`, action.state);

                    unsub();
                    updated      = null;
                    initial      = null;
                    createAction = null
                    unsub        = null;
                });
            }
        })
    }
}
