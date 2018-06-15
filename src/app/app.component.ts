import {Component} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'eventoo-app',
    templateUrl: './app.component.html',
})
export class AppComponent {
    public titleBig: string = 'Even';
    public titleSmall: string = 'too';
    public subtitle: string = 'find your nearest events';
}
