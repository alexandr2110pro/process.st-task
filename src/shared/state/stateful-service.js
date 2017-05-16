import _ from 'lodash';

import { PubSub } from 'shared/pub-sub';
import { NamedState } from './state';
import { PersistableState } from './persistable-state';


/**
 * See stateful-service.spec.js for usage details
 */
export class StatefulService extends PubSub {

    _onInitHook(args) { return args; }

    constructor(statePath, persistable = false, actionsPrefix = null, actions) {
        super();

        /** @type {PersistableState|NamedState} */
        this._state = persistable
            ? new PersistableState(statePath, actionsPrefix)
            : new NamedState(statePath, actionsPrefix);

        this._enrichActions({
            actionsPrefix,
            actions: this.constructor.ACTIONS || actions,
        });

        this._state.subscribe(a => this.publish(a));

        this._onInitHook();
    }

    _enrichActions({ actions, actionsPrefix }) {
        const _localActions = _.cloneDeep(actions);

        const _prefixedLocalActions = NamedState.prefixActions(_localActions,
            actionsPrefix);

        this.ACTIONS = _.assign(_prefixedLocalActions, this._state.ACTIONS);
    }

    _getState(path) {
        const state = this._state.getState() || null;
        return path && state ? _.get(state, path, null) : state;
    }

    _setState(statePath, newState) {
        const _state = arguments.length === 1 ? arguments[0] : newState;
        return arguments.length > 1
            ? this._setStateByPath(statePath, _state)
            : this._state.setState(_state);
    }

    _setStateByPath(path, newState) {
        const _currentState = this._state.getState() || {};
        _.set(_currentState, path, newState);
        return this._state.setState(_currentState);
    }

}
