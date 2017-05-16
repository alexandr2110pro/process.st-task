import { VideoPlayerComponent } from './video-player.component';

export const VIDEO_PLAYER_COMPONENT = angular
    .module('components.video-player', [])
    .component(VideoPlayerComponent.NAME, VideoPlayerComponent.OPTIONS)
    .name;
