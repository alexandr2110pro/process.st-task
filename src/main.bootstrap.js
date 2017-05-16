import { angular } from 'shared/vendor-modules'
import { BOOTSTRAP_MODULES, BOOTSTRAP_OPTIONS } from 'app';

/* ************************************************ */
angular.element(window.document).ready(() => {
    angular.bootstrap(window.document, BOOTSTRAP_MODULES, BOOTSTRAP_OPTIONS);
});

