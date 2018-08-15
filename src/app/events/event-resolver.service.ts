import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { EventService } from './shared/event.service';
import { map } from 'rxjs/operators';

@Injectable()
export class EventResolver implements Resolve<any> {

    constructor(private eventService: EventService) {

    }

    resolve(route: ActivatedRouteSnapshot) {
        console.log('PPPPPPPPPPPPP', route.params['id']);
        return this.eventService.getEvent(route.params['id']);
    }
}
