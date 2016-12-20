import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuizManagementComponent } from './components/quizManagement/quiz.management.component';
import { QuizSessionComponent } from './components/quizSession/quizSession.component';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { FormsModule } from '@angular/forms';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        QuizComponent,
        QuizManagementComponent,
        QuizSessionComponent
    ],
    providers: [
        AUTH_PROVIDERS
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'quiz', component: QuizComponent },
            { path: 'quizManagement', component: QuizManagementComponent },
            { path: 'quizSession/:id', component: QuizSessionComponent },
            { path: '**', redirectTo: 'home' }
        ], {useHash:true})
    ]
})
export class AppModule {
}
