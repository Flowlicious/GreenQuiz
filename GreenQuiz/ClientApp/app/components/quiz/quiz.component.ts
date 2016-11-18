import { Component } from '@angular/core';

@Component({
    selector: 'quiz',
    template: require('./quiz.component.html')
})
export class QuizComponent {
    public helloQuiz = "Hello Quiz";
}