import { Routes } from '@angular/router';
import { Error404Component } from './errors/404.component';
import { UserModule } from './user/user.module';

import {
    EventDetailComponent,
    EventsListComponent,
    EventsListResolver,
    CreateEventComponent,
    CreateSessionComponent,
    EventResolver
} from './events';

export const appRoutes: Routes = [
    { path: 'events', component: EventsListComponent, resolve: {events: EventsListResolver } },
    { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent']},
    { path: 'events/:id', component: EventDetailComponent, resolve: {event: EventResolver} },
    { path: '', redirectTo: '/events', pathMatch: 'full' },
    { path: 'events/session/new', component: CreateSessionComponent },
    { path: '404', component: Error404Component },
    { path: 'user', loadChildren: './user/user.module#UserModule' }
];
