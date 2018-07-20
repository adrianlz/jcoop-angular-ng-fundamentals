import { Component, Input } from '@angular/core';
import { IEvent } from './shared';

@Component({
    selector: 'event-thumbnail',
    template: `
    <div [routerLink]="['/events', event.id]">
        <div class=" well hoverwell thumbnail">
            <h2>{{event?.name}}</h2>
            <div>Date: {{event?.name}}</div>
            <div class="welL" [ngStyle]="getStartTimeStyle()" [ngSwitch]="event?.time">
                Time: {{event?.date}}
                <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
                <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
                <span *ngSwitchDefault>(Normal Start)</span>
            </div>


            <div>Price: \${{event?.price}}</div>
            <div *ngIf="event?.location">
                <span>Location: {{event?.location?.address}}</span>
                <span class="pad-left">{{event?.location?.city}}, {{event?.location?.country}}</span>
            </div>
            <div *ngIf="event?.onlineUrl">
                OnlineUrl : {{event?.onlineUrl}}
            </div>
        </div>
    </div>
    `,
    styles: [`
        .pad-left { margin-left: 10px; }
        .well div { color: #bbb }
        .thumbnial {min-height: 210px;}
    `]
})
export class EventThumnailComponent {
    @Input() event: IEvent;

    logFoo() {
        console.log('foo');
    }

    getStartTimeStyle() {
        const isEarlyStart = this.event && this.event.time === '8:00 am';
        if (isEarlyStart) {
            return {color: 'green', 'font-weight': 'bold'};
        }
        return {};
    }
}
