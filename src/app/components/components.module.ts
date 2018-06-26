import {NgModule} from '@angular/core';
import {RepositoryModule} from '../repositories/repository.module';
import {FindByCategoryComponent} from './find-by-category/findByCategory.component';
import {FindNearestEventsComponent} from './find-nearest-events/findNearestEvents.component';
import {NavBarComponent} from './navbar/navbar.component';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {UtilitiesModule} from '../utilities/utilities.module';

@NgModule({
    imports: [BrowserModule, FormsModule, RepositoryModule, UtilitiesModule],
    declarations: [FindByCategoryComponent, FindNearestEventsComponent, NavBarComponent],
    exports: [FindByCategoryComponent, FindNearestEventsComponent, NavBarComponent],
})
export class ComponentsModule {

}
