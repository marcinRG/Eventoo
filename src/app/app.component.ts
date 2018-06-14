import {Component} from '@angular/core';

declare var __moduleName: string;

@Component({
    moduleId: module.id,
    selector: 'eventoo-app',
    templateUrl: './app.component.html',
})
export class AppComponent {
    public title: string = 'Eventoo';
    public subtitle: string = 'events';
}
