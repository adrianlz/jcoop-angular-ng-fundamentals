import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { IEvent, ISession, EventService } from '../events/index';
@Component({
    selector: 'nav-bar',
    templateUrl: 'navbar.component.html',
    styles: [`
        .nav.navbar-nav {font-size: 15px;}
        #searchForm{margin-right: 100px;}
        @media (max-width: 120px) {#searchForm {display:none}}
        li > a.active { color: #f97924}
    `]
})
export class NavBarComponent implements OnInit {
    searchTerm = '';
    foundSessions: ISession[] = [];
    events: IEvent[] = [];

    constructor(public auth: AuthService, private eventService: EventService) {}

    ngOnInit(): void {
        this.eventService.getEvents().subscribe((events: IEvent[]) => {
            console.log('NavBar OnInit - Recived events...' + events.length);
            this.events = events;
        });
    }

    searchSessions(searchTerm: string) {
        this.eventService.searchSessions(searchTerm).subscribe(sessions => {
                this.foundSessions = sessions;
            });
    }
}
