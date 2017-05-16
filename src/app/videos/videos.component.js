import './videos.scss';


export class VideosComponent {
    static NAME    = 'videos';
    static OPTIONS = {
        controller: VideosComponent,
        template: require('./videos.template.html'),
        bindings: {},
    }


    $onInit() {
        this.broserIsVisible = false;
        this.uploadIsVisible = true;
        this.playerIsVisible = false;
    }

    onUploaded(result) {
        this.video = result;
        this.uploadIsVisible = false;
        this.playerIsVisible = true;
    }


    onFailed(data) {
        console.warn({ failed: data });
    }
}
