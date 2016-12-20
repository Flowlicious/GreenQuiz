import { Quiz } from './quiz.model'
import { Player } from './player.model';
export class QuizSession {
    constructor() { }
    public Quiz: Quiz;
    public ChallengerId: string;
    public Player1: Player;
    public Player2: Player;
    public Winner: Player;
}