import { VENDOR_MODULES } from 'shared';
import { VIDEOS_MODULE } from './videos';

import { AppComponent } from './app.component';


const APP_MODULE = angular
    .module('process.st.app-module', [
        ...VENDOR_MODULES,
        VIDEOS_MODULE,
    ])
    .component(AppComponent.NAME, AppComponent.OPTIONS)
    .name;


export const BOOTSTRAP_OPTIONS = { strictDi: true };
export const BOOTSTRAP_MODULES = [APP_MODULE];

