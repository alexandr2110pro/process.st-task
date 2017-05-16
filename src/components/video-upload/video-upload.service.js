import _map from 'lodash/map';
import uuid from 'uuid';

import { PubSub } from 'shared/pub-sub';


export class VideoUploadService extends PubSub {

    ACTIONS = {
        PROGRESS: 'PROGRESS',
        START: 'START',
        DONE: 'DONE',
        FAIL: 'FAIL',
    };

    /**
     * @param {WistiaUploadService} WistiaUploadService
     */
    constructor(WistiaUploadService) {
        'ngInject';

        super();

        this._WistiaUploadService = WistiaUploadService;
    }


    getUploadOptions() {
        const uploadId  = uuid();
        const url       = this._WistiaUploadService.getUploadUrl();
        const params    = this._WistiaUploadService.getUploadParams();
        const formData  = _map(params, (v, k) => ({ name: k, value: v }));
        const eventsMap = this._createEventsMap(uploadId);

        return {
            url,
            uploadId,
            formData,
            ...eventsMap,
        };
    };

    _createEventsMap(uploadId) {
        return {
            // not sure about this event.. Probably they emit something more suitable
            // for the "upload start" tracking... Don't want to dig to deeply into their
            // docs. If it was the real-life task, I would read it in details of course.
            // But not for the test task.
            start: (e, data) => this._onUploadStart(e, data, uploadId),
            progressall: (e, data) => this._onProgress(e, data, uploadId),
            done: (e, data) => this._onDone(e, data, uploadId),
            fail: (e, data) => this._onFail(e, data, uploadId),
        }
    }


    _onUploadStart(e, data, uploadId) {
        this.publish({
            type: this.ACTIONS.START,
            data,
            uploadId,
        })
    }

    _onProgress(e, data, uploadId) {
        const { loaded, total } = data;
        this.publish({
            type: this.ACTIONS.PROGRESS,
            progress: parseInt(loaded / total * 100, 10),
            uploadId,
        })
    }

    _onDone(e, data, uploadId) {
        this.publish({
            type: this.ACTIONS.DONE,
            result: data.result,
            uploadId,
        });
    }

    _onFail(e, data, uploadId) {
        this.publish({
            type: this.ACTIONS.FAIL,
            data,
            uploadId,
        })
    }

}
