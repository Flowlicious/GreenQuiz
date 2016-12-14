import { Component } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Auth } from '../../auth/auth.service';
import { Quiz } from '../../model/quiz.model';

@Component({
    selector: 'quiz-management',
    template: require('./quiz.management.component.html'),
    providers: [QuizService, Auth]
})
export class QuizManagementComponent {
    quizzes: Quiz[];
    constructor(private quizService: QuizService, private auth: Auth) {
        quizService.getByPerson(auth.getCurrentUser().user_id).subscribe(result => {
            console.log(result);
        }
            , error => {
                console.log(error);
            });
    }
    public quizHello = "Hallo Management";
}