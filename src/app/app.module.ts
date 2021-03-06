import { appRoutes } from './routes';
import {JQUERY_TOKEN, TOASTR_TOKEN, IToastr, CollapsibleWellComponent, SimpleModalComponent, ModalTriggerDirective} from './common/index';
import { NavBarComponent } from './nav/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { Error404Component } from './errors/404.component';
import { EventsAppComponent } from './events-app.component';

import {
  EventsListResolver,
  EventService,
  EventDetailComponent,
  CreateEventComponent,
  EventThumnailComponent,
  EventsListComponent,
  CreateSessionComponent,
  DurationPipe,
  UpvoteComponent,
  VoterService,
  LocationValidator,
  EventResolver
} from './events/index';
import { UserModule } from './user/user.module';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '../../node_modules/@angular/forms';
import { SessionListComponent } from './events/event-details/sessions-list.component';
import { HttpClientModule } from '@angular/common/http';

let toastr: IToastr = window['toastr'];
let jQuery = window['$'];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
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
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpvoteComponent,
    LocationValidator
  ],
  providers: [
    EventService,
    { provide: TOASTR_TOKEN, useValue: toastr },
    { provide: JQUERY_TOKEN, useValue: jQuery },
    EventResolver,
    { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState },
    EventsListResolver,
    AuthService,
    VoterService
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
