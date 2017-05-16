import { VideoUploadComponent } from './video-upload.component';


describe('VideoUploadComponent', () => {

    let $componentController;

    beforeEach(() => {
        angular
            .module('test', [])
            .component(VideoUploadComponent.NAME, VideoUploadComponent.OPTIONS);

        angular.mock.module('test');
    });


    beforeEach(angular.mock.inject($injector => {
        $componentController = $injector.get('$componentController');
    }));


});
