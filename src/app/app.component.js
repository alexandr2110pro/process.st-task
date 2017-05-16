import './app.scss';


export class AppComponent {
    static NAME    = 'app';
    static OPTIONS = {
        controller: AppComponent,
        template: require('./app.template.html'),
        bindings: {},
    };
}
