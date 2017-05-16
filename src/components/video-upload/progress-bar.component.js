import './progress-bar.scss';


export class ProgressBarComponent {
    static NAME    = 'progressBar';
    static OPTIONS = {
        controller: ProgressBarComponent,
        template: require('./progress-bar.template.html'),
        bindings: { progress: '<' },
    };


    constructor() {
        this.progressBarStyles = {
            width: 0,
        };
    }


    $onChanges() {
        this._updateStyles();
    }


    _updateStyles() {
        this.progressBarStyles.width = `${this.progress}%`;
    }
}
