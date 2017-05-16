import _isObject from 'lodash/isObject';
import _get from 'lodash/get';

import './video-player.scss';


export class VideoPlayerComponent {
    static NAME    = 'videoPlayer';
    static OPTIONS = {
        controller: VideoPlayerComponent,
        template: require('./video-player.template.html'),
        bindings: {
            video: '<',
        },
    }

    get hash() {
        return _isObject(this.video) && _get(this.video, ['hashed_id']) || null;
    }

}
