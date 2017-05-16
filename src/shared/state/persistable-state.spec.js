import { PersistableState } from './persistable-state';


describe('PersistableState', () => {
    const localStorage = window.localStorage;


    beforeEach(() => {
        localStorage.clear();
    });


    describe('buildLSKey()', () => {
        it('should return the ls key based on the state path', () => {
            const testLSKeyState = new PersistableState('test.ls.key');
            expect(testLSKeyState.buildLSKey()).toEqual('STATE__test.ls.key');
        });
    });


    it('should persist its value to the ls on each setState()', () => {
        const testPersist = new PersistableState('test.persist');
        const lsKey       = testPersist.buildLSKey();
        const newState    = { test: { ls: 'value' } };

        expect(localStorage.getItem(lsKey)).toEqual(JSON.stringify({ state: null }));

        testPersist.setState(newState);
        expect(localStorage.getItem(lsKey)).toEqual(JSON.stringify({ state: newState }));
    });


    it('should initialize with saved in ls value', () => {
        const statePath      = 'test.init.value'
        const lsKey          = `STATE__${statePath}`;
        const initStateValue = {
            test: { init: 'init value' },
        };

        localStorage.setItem(lsKey, JSON.stringify({ state: initStateValue }))
        const stateInstance = new PersistableState(statePath);

        expect(stateInstance.getState()).toEqual(initStateValue);
    })

});
