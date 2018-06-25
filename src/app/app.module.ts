import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {appRoutes} from './routes';
import {MainPageComponent} from './pages/main/mainPage.component';
import {ComponentsModule} from './components/components.module';

@NgModule({
    declarations: [
        AppComponent,
        MainPageComponent,
    ],
    imports: [
        ComponentsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes, {enableTracing: false, useHash: true}),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
