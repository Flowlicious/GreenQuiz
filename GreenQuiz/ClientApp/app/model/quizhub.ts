/// <reference path="../../../typings/globals/signalr/index.d.ts" />
import { Quiz } from './quiz.model';
import { QuizSession } from './quizsession.model';
//interface SignalR {
//    quizHub: HubProxy;
//}
// export interface HubProxy {
//    client: IQuizHubClient;
//}
//interface IQuizHubClient {
//    publishQuiz(quiz: Quiz);
// }
//interface HubConnection extends SignalR {
//    hub: SignalR.Hub.Connection;
//}


export interface QuizSignalR extends SignalR {
    quizHub: QuizProxy
}

export interface QuizProxy {
    client: QuizClient;
    server: FeedServer;
}

export interface QuizClient {
    addQuiz(quiz: Quiz): void;
    updateSession(session: QuizSession): void;
}

export interface FeedServer {
    subscribe(personId: string): void;
    unsubscribe(personId: string): void;
    subscribeToSession(sessionId: string): void;
    unsubscribeFromSession(sessionId: string): void;
}

export enum SignalRConnectionStatus {
    Connected = 1,
    Disconnected = 2,
    Error = 3
}
