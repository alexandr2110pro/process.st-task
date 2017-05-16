import { WISTIA_CONFIG } from './wistia-config.constant';
import { WistiaUploadService } from './wistia-upload.service';


export const WISTIA_MODULE = angular.module('shared.wistia-module', [])
    .constant('WISTIA_CONFIG', WISTIA_CONFIG)
    .service('WistiaUploadService', WistiaUploadService)
    .name;
