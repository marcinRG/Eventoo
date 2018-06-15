import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NavBarComponent} from './components/navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {appRoutes} from './routes';
import {MainPageComponent} from './pages/main/mainPage.component';
import {FindNearestEventsComponent} from './components/find-nearest-events/findNearestEvents.component';
import {FindByCateogryComponent} from './components/find-by-category/findByCateogry.component';

@NgModule({
    declarations: [
        AppComponent,
        NavBarComponent,
        FindNearestEventsComponent,
        FindByCateogryComponent,
        MainPageComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes, { enableTracing: true, useHash: true }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
