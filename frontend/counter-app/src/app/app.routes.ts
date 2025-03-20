import { Routes } from '@angular/router';
import { UpComponent } from './up/up.component';
import { DownComponent } from './down/down.component';
import { HomeComponent } from './home/home.component';
import { ResetComponent } from './reset/reset.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                pathMatch: 'full', // Ensures exact empty path match
                redirectTo: 'up' // Redirects to /up
            },
            {
                path: 'up',
                component: UpComponent                
            },
            {
                path: 'down',
                component: DownComponent
            },
            {
                path: 'reset',
                component: ResetComponent
            }
        ]
    },
];
