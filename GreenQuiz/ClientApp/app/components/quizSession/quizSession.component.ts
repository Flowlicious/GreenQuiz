import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../model/quiz.model';
import { QuizSession } from '../../model/quizsession.model';
import { Player } from '../../model/player.model';
import { Frage } from '../../model/frage.model';
import { FeedService } from '../../services/feed.service';
import { SignalRConnectionStatus, QuizSignalR, FeedServer } from '../../model/quizhub';


@Component({
    selector: 'quiz-session',
    template: require("./quizsession.component.html"),
    providers: [QuizService]
})
export class QuizSessionComponent {
    session: QuizSession = new QuizSession();
    frage: Frage = new Frage();
    player: Player = new Player();
    playName: string;
    sessionId: string;
    constructor(private quizService: QuizService, private feedService: FeedService, private ngZone: NgZone, private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit() {
        debugger;

        this.feedService.connectionState.subscribe((state: SignalRConnectionStatus) => {
            if (state == SignalRConnectionStatus.Connected) {
                this.feedService.subscribeToSession(this.sessionId);

                this.feedService.updateSession.subscribe((session: QuizSession) => {
                    debugger;
                    this.ngZone.run(() => {
                        this.sessionUpdated(session);
                    })
                })
            }
        })

        this.route.params.subscribe((params: Params) => this.sessionId = params["id"]);


       
         
        this.quizService.getSessionById(this.sessionId).subscribe((response: any) => {
            this.session = JSON.parse(response._body);
            this.frage.Id = 1;
            this.frage.Antworten = this.session.Quiz.Fragen[0].Antworten;
            this.frage.RichtigeAntwort = this.session.Quiz.Fragen[0].RichtigeAntwort;
            this.frage.Titel = this.session.Quiz.Fragen[0].Titel;
        },
            error => console.log(error))
  

    }

    beitreten() {
        debugger;
        if (!this.session.Player1) {
            this.player.PlayerNummer = 1;
            this.session.Player1 = this.player;
        }
        else {
            this.player.PlayerNummer = 2;
            this.session.Player2 = this.player;
        }
        this.updateSession();
        this.player.IsBeigetreten = true;
    }
    logAntwort() {
        this.player.HatGeantwortet = true;
        //test ob player1 an player gebunden ist
        debugger;
        this.updateSession();
    }

    updateSession() {
        this.quizService.updateSession(this.session, this.sessionId);
    }


    sessionUpdated(session: QuizSession) {
        this.session.Player1 = session.Player1;
        this.session.Player2 = session.Player2;
        if (this.session.Player1.HatGeantwortet && this.session.Player2.HatGeantwortet) {
            if (this.session.Player1.Antwort == this.frage.RichtigeAntwort) {
                this.session.Player1.Points = this.session.Player1.Points++;
            }
            if (this.session.Player2.Antwort == this.frage.RichtigeAntwort) {
                this.session.Player2.Points = this.session.Player2.Points++;
            }
            this.session.Player1.Antwort = null;
            this.session.Player1.HatGeantwortet = false;
            this.session.Player2.Antwort = null;
            this.session.Player2.HatGeantwortet = false;
            //player zurücksetzen?


            this.neueFrage();
        }
    }

    neueFrage() {
        if (this.frage.Id == this.session.Quiz.Fragen.length) {
            //keine neuen Fragen
            this.session.Player1.Points > this.session.Player2.Points ? this.session.Winner = this.session.Player1 : this.session.Winner = this.session.Player2;
        }
        else {
            this.frage.Id = this.frage.Id + 1;
            this.frage.Antworten = this.session.Quiz.Fragen[this.frage.Id - 1].Antworten;
            this.frage.RichtigeAntwort = this.session.Quiz.Fragen[this.frage.Id - 1].RichtigeAntwort;
            this.frage.Titel = this.session.Quiz.Fragen[this.frage.Id - 1].Titel;
        }
    }
}
