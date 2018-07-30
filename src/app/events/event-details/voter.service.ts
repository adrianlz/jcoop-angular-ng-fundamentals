import { Injectable } from "../../../../node_modules/@angular/core";
import { ISession } from "../shared";
import { InjectSetupWrapper } from "../../../../node_modules/@angular/core/testing";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, } from "../../../../node_modules/rxjs/operators";
import { Observable, of } from 'rxjs';

@Injectable()
export class VoterService {

    constructor(private httpClient: HttpClient) {}
    
    deleteVoter(eventId: number, session: ISession, voterName: string) {
        session.voters = session.voters.filter(voter => voter !== voterName);
        const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;



        this.httpClient.delete(url)
            .pipe(catchError(this.handleError('deleteVoter')))
            .subscribe();

    }

    addVoter(eventId: number, session: ISession, voterName: string) {
        session.voters.push(voterName);

        const options = { headers: new HttpHeaders({ 'Content-type': '/application/json'}) };
        const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
        this.httpClient.post(url, {}, options)
            .pipe(catchError(this.handleError('addVoter')))
            .subscribe();
    }

    userHasVoted(session: ISession, voterName: string) {
        return session.voters.some(voter => voter === voterName);
    }

    private handleError<T> (operation = 'operation', result?:T) {
        return (error:any):Observable<T> => {
            console.log(error);
            return of(result as T);
        }
    }
}