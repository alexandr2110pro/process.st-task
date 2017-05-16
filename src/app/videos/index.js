import {
    VIDEO_PLAYER_COMPONENT,
    VIDEO_UPLOAD_COMPONENT,
} from 'components';

import { VideosComponent } from './videos.component';


export const VIDEOS_MODULE = angular
    .module('app.videos', [
        VIDEO_UPLOAD_COMPONENT,
        VIDEO_PLAYER_COMPONENT,
    ])
    .component(VideosComponent.NAME, VideosComponent.OPTIONS)
    .name;
