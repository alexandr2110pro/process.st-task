export class WistiaUploadService {


    constructor(WISTIA_CONFIG) {
        'ngInject';

        this._WISTIA_CONFIG = WISTIA_CONFIG;
    }


    /**
     * @return {String}
     */
    getUploadUrl() {
        return this._WISTIA_CONFIG.UPLOAD_URL;
    }


    /**
     * @return {Object}
     */
    getUploadParams() {
        return {
            api_password: this._WISTIA_CONFIG.API_PASSWORD,
        }
    }
}
