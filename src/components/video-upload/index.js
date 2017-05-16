import { WISTIA_MODULE } from 'shared';

import { ProgressBarComponent } from './progress-bar.component';
import { VideoUploadComponent } from './video-upload.component';
import { VideoUploadService } from './video-upload.service';


export const VIDEO_UPLOAD_COMPONENT = angular
    .module('components.video-upload', [
        WISTIA_MODULE,
    ])
    .service('VideoUploadService', VideoUploadService)
    .component(VideoUploadComponent.NAME, VideoUploadComponent.OPTIONS)
    .component(ProgressBarComponent.NAME, ProgressBarComponent.OPTIONS)
    .name;
