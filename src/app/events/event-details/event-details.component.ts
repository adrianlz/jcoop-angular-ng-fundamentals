import { EventService } from '../shared/event.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IEvent, ISession } from '../shared/event.model';


@Component({
    templateUrl: './event-details.component.html',
    styles: [`
        .container { padding-left: 20px; padding-right: 20px }
        .event-image {height: 100px }
        a { cursor: pointer }
    `]
})
export class EventDetailComponent implements OnInit {
    event: IEvent;
    addMode: boolean;
    filterBy = 'all';
    sortBy = 'votes';

    constructor(private eventService: EventService, private route: ActivatedRoute) {}

    ngOnInit() {
        console.log('EventDetailComponent - ngOninit()...',this.route.data );
        this.route.data.forEach((data) => {
            this.event = data['event'];
            this.addMode = false;
        });
    }

    addSession() {
        this.addMode = true;
    }

    edSaveNewSession(session: ISession) {
        const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
        session.id = nextId + 1;
        this.event.sessions.push(session);
        this.eventService.saveEvent(this.event).subscribe();
        this.addMode = false;
        console.log('EventDetailsComponent - edSaveNewSession...');
    }

    cancelAddSession() {
        this.addMode = false;
    }
}
