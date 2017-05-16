import { NamedState } from './state';


describe('State', () => {

    /** @type {NamedState} */
    let stateFoo;
    /** @type {NamedState} */
    let stateFooBar;
    /** @type {NamedState} */
    let stateFooBarBaz;
    /** @type {NamedState} */
    let stateFooQuix;


    beforeEach(() => {
        stateFoo       = new NamedState('foo');
        stateFooBar    = new NamedState('foo.bar');
        stateFooBarBaz = new NamedState('foo.bar.baz');
        stateFooQuix   = new NamedState('foo.quix');
    });

    describe('instance.ACTIONS.STATE_CHANGED', () => {

        it('should be auto-prefixed using uppercased statePath by default', () => {
            expect(stateFoo.ACTIONS.STATE_CHANGED).toEqual('FOO_STATE_CHANGED');
            expect(stateFooBarBaz.ACTIONS.STATE_CHANGED).toEqual(
                'FOO.BAR.BAZ_STATE_CHANGED');
        });

        it('should be prefixed with custom prefix, provided to the constructor as the 2nd arg',
            () => {
                const CUSTOM_PREFIX     = 'CuSt0m=';
                const customPrefixState = new NamedState('custom.prefix.state',
                    CUSTOM_PREFIX);

                expect(customPrefixState.ACTIONS.STATE_CHANGED)
                    .toEqual(`${CUSTOM_PREFIX}_STATE_CHANGED`);
            });

    });

    describe('getState() / setState()', () => {
        it(`should get / set the state accordingly to state's path`, () => {
            const fooBarNewState = {
                baz: 'bazValue',
                barProp: 'fooBar.prop value',
            };

            stateFooBar.setState(fooBarNewState);

            expect(stateFoo.getState()).toEqual({
                bar: fooBarNewState,
                quix: null,
            });
            expect(stateFooBar.getState()).toEqual(fooBarNewState);
            expect(stateFooBarBaz.getState()).toEqual(fooBarNewState.baz)
        });

        it('should publish StateInstance.ACTIONS.STATE_CHANGED action if the state was changed',
            () => {
                const newFooBarState = {
                    baz: 'new foo.bar.baz value',
                };

                const fooSubscriber       = jasmine.createSpy('fooSubscriber');
                const fooBarSubscriber    = jasmine.createSpy('fooBarSubscriber');
                const fooBarBazSubscriber = jasmine.createSpy('fooBarBazSubscriber');
                const fooQuixSubscriber   = jasmine.createSpy('fooQuixSubscriber');

                const unsub = [
                    stateFoo.subscribe(fooSubscriber),
                    stateFooBar.subscribe(fooBarSubscriber),
                    stateFooBarBaz.subscribe(fooBarBazSubscriber),
                    stateFooQuix.subscribe(fooQuixSubscriber),
                ];


                stateFooBar.setState(newFooBarState);

                expect(fooSubscriber)
                    .toHaveBeenCalledWith({ type: stateFoo.ACTIONS.STATE_CHANGED });
                expect(fooBarSubscriber)
                    .toHaveBeenCalledWith({ type: stateFooBar.ACTIONS.STATE_CHANGED });

                // foo.quix is not changed
                expect(fooQuixSubscriber).not.toHaveBeenCalled();
                // but foo is changed, because foo.bar is changed
                expect(fooBarBazSubscriber).toHaveBeenCalled();


                const newFooState = {
                    prop: 'new foo.prop value',
                    quix: 'new foo.quix state value',
                };

                stateFoo.setState(newFooState);

                expect(fooSubscriber).toHaveBeenCalled();
                expect(fooBarSubscriber).toHaveBeenCalled();
                expect(fooBarBazSubscriber).toHaveBeenCalled();
                expect(fooQuixSubscriber).toHaveBeenCalled();

                unsub.forEach(f => f());
            });

    });

});
