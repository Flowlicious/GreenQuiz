import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Quiz } from '../model/quiz.model';
import { QuizSession } from '../model/quizsession.model';
import { SignalRConnectionStatus, QuizSignalR, FeedServer } from '../model/quizhub';

@Injectable()
export class FeedService {
    currentState = SignalRConnectionStatus.Disconnected;
    connectionState: Observable<SignalRConnectionStatus>;
    setConnectionId: Observable<string>;

    private connectionStateSubject = new Subject<SignalRConnectionStatus>();

    private setConnectionIdSubject = new Subject<string>();

    addQuiz: Observable<Quiz>;
    private addQuizSubject = new Subject<Quiz>();

    updateSession: Observable<QuizSession>;
    private updateSessionSubject = new Subject<QuizSession>();


    private server: FeedServer;

    constructor() {
        this.connectionState = this.connectionStateSubject.asObservable();
        this.setConnectionId = this.setConnectionIdSubject.asObservable();

        this.addQuiz = this.addQuizSubject.asObservable();

        this.updateSession = this.updateSessionSubject.asObservable();
    }

    private onAddQuiz(quiz: Quiz) {
        this.addQuizSubject.next(quiz);
    }

    private onUpdateSession(quizSession: QuizSession) {
        this.updateSessionSubject.next(quizSession);
    }

    private setConnectionState(connectionState: SignalRConnectionStatus) {
        console.log('connection state changed to: ' + connectionState);
        this.currentState = connectionState;
        this.connectionStateSubject.next(connectionState);
    }

    start(debug: boolean): Observable<SignalRConnectionStatus>{
        let connection = <QuizSignalR>$.connection;
        let feedHub = connection.quizHub;
        this.server = feedHub.server;

        feedHub.client.addQuiz = quiz => this.onAddQuiz(quiz);
        feedHub.client.updateSession = session => this.onUpdateSession(session);


        $.connection.hub.start()
            .done(response => this.setConnectionState(SignalRConnectionStatus.Connected))
            .fail(error => this.connectionStateSubject.error(error));

        return this.connectionState;
    }

    // Server side methods
    public subscribeToFeed(personid: string) {
        this.server.subscribe(personid);
    }

    public unsubscribeFromFeed(personid: string) {
        this.server.unsubscribe(personid);
    }

    public subscribeToSession(sessionId: string) {
        this.server.subscribeToSession(sessionId);
    }
    public unsubscribeFromSession(sessionId: string) {
        this.server.unsubscribeFromSession(sessionId);
    }
}