import _noop from 'lodash/noop';
import _cloneDeep from 'lodash/cloneDeep';
import _transform from 'lodash/transform';
import _pull from 'lodash/pull';


const _listeners = Symbol('listeners');
const DEBUG      = false;

export class PubSub {

    constructor() {
        this[_listeners] = [];
    }

    subscribe(listener) {
        this[_listeners].push(listener);
        return () => _pull(this[_listeners], listener);
    }

    publish(message) {
        debug(message);

        this[_listeners].forEach(listener => listener(message));
    }


    removeAllListeners() {
        this[_listeners] = [];
    }

    destroy() {
        this.removeAllListeners();
        this.publish            = _noop();
        this.subscribe          = _noop();
        this.removeAllListeners = _noop();
    }
}


function debug(message) {
    if (!DEBUG) return;

    let deb = _transform(message, (r = {}, val, key) => {
        if (key === 'type') {
            console.debug(`[INFO] ACTION: ${val}`)
        } else {
            r[key] = _cloneDeep(val);
        }
        return r;
    });

    console.log(JSON.stringify(deb, null, 2));
}
