import { appRoutes } from './routes';
import { TOASTR_TOKEN, IToastr } from './common/toastr.service';
import { NavBarComponent } from './nav/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { Error404Component } from './errors/404.component';
import { EventsAppComponent } from './events-app.component';

import {
  EventsListResolver,
  EventRouterActivator,
  EventService,
  EventDetailComponent,
  CreateEventComponent,
  EventThumnailComponent,
  EventsListComponent,
  CreateSessionComponent,
  DurationPipe
} from './events/index';
import { UserModule } from './user/user.module';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '../../node_modules/@angular/forms';
import { SessionListComponent } from './events/event-details/sessions-list.component';
import { CollapsibleWellComponent } from './common/collapsible-well.component';


declare let toastr: IToastr;
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumnailComponent,
    NavBarComponent,
    EventDetailComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe
  ],
  providers: [
    EventService,
    { provide: TOASTR_TOKEN, useValue: toastr },
    EventRouterActivator,
    { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState },
    EventsListResolver,
    AuthService
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm('You have not saved this event, do you really want to cancel?');
  }
  return true;
}
