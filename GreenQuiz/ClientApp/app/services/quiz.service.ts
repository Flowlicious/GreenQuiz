import { Injectable } from '@angular/core';
import { Quiz } from '../model/quiz.model';
import { QuizSession } from '../model/quizsession.model';
import { Http } from '@angular/http';

@Injectable()
export class QuizService {
    constructor(private http: Http) {

    }
    public save(quiz: Quiz) {
       return this.http.post("/api/quiz", quiz).subscribe(result => {
            console.log(result);
        },
            error => {
                console.log(error);
            }
        )
    }

    public saveSession(quizSession: QuizSession) {
        return this.http.post("/api/quizSession", quizSession).subscribe(result => {
            console.log(result);
        },
            error => {
                console.log(error);
            }
        );
    }

    public updateSession(quizSession: QuizSession, sessionId) {
        return this.http.post("/api/quizSession/update/" + sessionId, quizSession).subscribe(result => {
            console.log(result);
        },
            error => {
                console.log(error);
            }
        );
    }

    public getByPerson(personId: string)  {
        return this.http.get("/api/quiz/" + personId);
    }

    public getSessionById(sessionid: string) {
        return this.http.get("/api/quizsession/" + sessionid)
    }
}


