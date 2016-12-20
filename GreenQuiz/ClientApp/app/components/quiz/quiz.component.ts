/// <reference path="../../../../typings/globals/auth0-js/index.d.ts" />
/// <reference path="../../auth/auth.service.ts" />
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Auth } from '../../auth/auth.service';
import { Quiz } from '../../model/quiz.model';
import { Frage } from '../../model/frage.model';
import { Antwort } from '../../model/antwort.model';
//import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { } from 'jQuery';

@Component({
    selector: 'quiz',
    template: require('./quiz.component.html'),
    styles: [require('./quiz.component.css')],
    providers: [Auth, QuizService]

})
export class QuizComponent {
    public quiz: Quiz;
    public neueFrage: Frage;
    public antwort1: Antwort;
    public antwort2: Antwort;
    public antwort3: Antwort;
    public antwort4: Antwort;

    currentUser: Auth0UserProfile;
    constructor(private http: Http, public auth: Auth, private quizService: QuizService) {
        this.quiz = new Quiz();
        this.neueFrage = new Frage();
        this.antwort1 = new Antwort();
        this.antwort2 = new Antwort();
        this.antwort3 = new Antwort();
        this.antwort4 = new Antwort();
    }


    public save(quiz: Quiz, valid) {    
        if (valid && this.auth.getCurrentUser()) {
            this.quiz.PersonId = this.auth.getCurrentUser().user_id;

            this.quizService.save(this.quiz);
          //  this.router.navigateByUrl('/quizManagement');
        }
    }

    public frageHinzufuegen() {
        if (!this.neueFrage.Antworten)
            this.neueFrage.Antworten = [];
        this.neueFrage.Antworten[0] = this.antwort1;
        this.neueFrage.Antworten[1] = this.antwort2;
        if (this.antwort3)
            this.neueFrage.Antworten[2] = this.antwort3;
        if (this.antwort4)
            this.neueFrage.Antworten[3] = this.antwort4;
        if (!this.quiz.Fragen) {
            this.quiz.Fragen = [];
        }
        this.quiz.Fragen.push(this.neueFrage);
        this.neueFrage = new Frage();
        this.antwort1 = new Antwort();
        this.antwort2 = new Antwort();
        this.antwort3 = new Antwort();
        this.antwort4 = new Antwort();
    }
}