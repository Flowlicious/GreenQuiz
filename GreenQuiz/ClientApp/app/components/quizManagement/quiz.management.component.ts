/// <reference path="../../../../typings/globals/signalr/index.d.ts" />
/// <reference path="../../../../typings/globals/signalr/index.d.ts" />
/// <reference path="../../model/quizhub.ts" />
import { Component, NgZone } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Auth } from '../../auth/auth.service';
import { Quiz } from '../../model/quiz.model';
import { FeedService } from '../../services/feed.service';
import { QuizSession } from '../../model/quizsession.model';


@Component({
    selector: 'quiz-management',
    template: require('./quiz.management.component.html'),
    providers: [QuizService, Auth]
})
export class QuizManagementComponent {
    quizzes: Quiz[];
    private channel = "tasks";
    constructor(private quizService: QuizService, private auth: Auth, private feedService: FeedService, private ngZone : NgZone) {
        if (!this.quizzes)
            this.quizzes = new Array<Quiz>();
    }

    ngOnInit() {
        let self = this;
        this.feedService.subscribeToFeed(this.auth.getCurrentUser().user_id);

        self.feedService.addQuiz.subscribe((quiz: Quiz) => {
            debugger;
            this.ngZone.run(() => {
                console.log("zone");
                this.quizzes.push(quiz);
            });        

        })
    
        this.quizService.getByPerson(this.auth.getCurrentUser().user_id).subscribe((result: any) => {
            this.quizzes = JSON.parse(result._body);

        }
            , error => {
                console.log(error);
            });

 
    }

    neueSession(quiz: Quiz) {
        var session = new QuizSession();
        session.Quiz = quiz;
        session.ChallengerId = this.auth.getCurrentUser().user_id;
        this.quizService.saveSession(session);
    }

    public quizHello = "Hallo Management";
}