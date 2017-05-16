import { StatefulService } from './stateful-service';


describe('StatefulService', () => {

    class FooService extends StatefulService {
        constructor() {
            super('test.foo');
        }

        setFoo(val) {
            this._state.setState(val);
        }
    }

    class FooBarService extends StatefulService {
        constructor() {
            super('test.foo.bar', true);
        }

        setFooBar(val) {
            this._state.setState(val);
        }
    }


    let fooServiceInstance;
    let fooBarServiceInstance;
    let localStorage;

    beforeEach(() => {
        localStorage = window.localStorage;

        angular.module('test', [])
            .service('FooService', FooService)
            .service('FooBarService', FooBarService);

        angular.mock.module('test');
    });

    beforeEach(angular.mock.inject($injector => {
        fooServiceInstance    = $injector.get('FooService');
        fooBarServiceInstance = $injector.get('FooBarService');
    }));


    describe('extended service', () => {
        it('should notify about state changes', () => {
            const fooSubscriber    = jasmine.createSpy('fooSubscriber');
            const fooBarSubscriber = jasmine.createSpy('fooBarSubscriber');
            const newFooBarValue   = { prop: 'val' };

            fooServiceInstance.subscribe(fooSubscriber);
            fooBarServiceInstance.subscribe(fooBarSubscriber);

            fooBarServiceInstance.setFooBar(newFooBarValue);

            expect(fooSubscriber).toHaveBeenCalled();
            expect(fooBarSubscriber).toHaveBeenCalled();
        });


        it('should persist state if super was called with 2nd argument equal true',
            () => {
                const newState = { prop: 'val' };
                const lsKey    = 'STATE__test.foo.bar';

                fooBarServiceInstance.setFooBar(newState);
                expect(JSON.parse(localStorage.getItem(lsKey)))
                    .toEqual({ state: newState });
            });

    });

});
