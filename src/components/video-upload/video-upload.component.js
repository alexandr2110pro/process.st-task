import { SubscriberComponent } from 'shared/pub-sub';

import './video-upload.scss';


export class VideoUploadComponent extends SubscriberComponent {

    static NAME = 'videoUpload';

    static OPTIONS = {
        controller: VideoUploadComponent,
        template: require('./video-upload.template.html'),
        bindings: {
            onUploaded: '&',
            onFailed: '&',
        },
    };


    /**
     * @param $element
     * @param $scope
     * @param {VideoUploadService} VideoUploadService
     */
    constructor($element, $scope, VideoUploadService) {
        'ngInject';

        super();

        this._$scope   = $scope;
        this._$element = $element;

        this._VideoUploadService = VideoUploadService;

    }

    $onInit() {
        this._subscribeTo([this._VideoUploadService]);
        this._$element.fileupload(this._VideoUploadService.getUploadOptions());
    }


    _handleAction(action) {
        this._$scope.$applyAsync(this._processAction(action));
    }

    _onStart({ uploadId }) {
        this._setUploadId(uploadId);
        this._resetProgress();
        this._showProgressBar();
    }

    _updateProgress({ uploadId, progress }) {
        if (!this._checkUploadID(uploadId)) return;

        this.progress = progress;
    }


    _onComplete({ uploadId, result }) {
        if (!this._checkUploadID(uploadId)) return;

        this._hideProgressBar();
        this._resetProgress();
        this._resetUploadId();
        this._notifyUploaded(result);
    }


    _onFail({ uploadId, data }) {
        if (!this._checkUploadID(uploadId)) return;

        this._hideProgressBar();
        this._resetProgress();
        this._resetUploadId();
        this._notifyFailed(data)
    }


    //  ------------------------------------


    _showProgressBar() {
        this.progressVisible = true;
    }

    _hideProgressBar() {
        this.progressVisible = false;
    }

    _resetProgress() {
        this.progress = 0;
    }


    _setUploadId(uploadId) {
        this._uploadId = uploadId;
    }

    _resetUploadId() {
        this._uploadId = null;
    }

    _checkUploadID(uploadId) {
        if (this._uploadId === uploadId) return true;
        console.warn('unmatched uploadId', this._uploadId, uploadId);
        return false;
    }


    _notifyUploaded(result) {
        this.onUploaded({ result });
    }

    _notifyFailed(data) {
        this.onFailed(data);
    }

    _processAction(action) {
        switch (action.type) {

            case this._VideoUploadService.ACTIONS.START:
                this._onStart(action);
                break;

            case this._VideoUploadService.ACTIONS.PROGRESS:
                this._updateProgress(action);
                break;

            case this._VideoUploadService.ACTIONS.DONE:
                this._onComplete(action);
                break;


            case this._VideoUploadService.ACTIONS.FAIL:
                this._onFail(action);
                break;

            default:
                break;
        }
    }
}
