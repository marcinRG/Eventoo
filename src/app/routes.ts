import {Routes} from '@angular/router';
import {MainPageComponent} from './pages/main/mainPage.component';

export const appRoutes: Routes = [
    {path: 'main', component: MainPageComponent},
    {path: '', redirectTo: 'main', pathMatch: 'full'},
];
