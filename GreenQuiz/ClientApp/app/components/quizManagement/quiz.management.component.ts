import { Component } from '@angular/core';

@Component({
    selector: 'quiz-management',
    template: require('./quiz.management.component.html')
})
export class QuizManagementComponent {
    public quizHello = "Hallo Management";
}