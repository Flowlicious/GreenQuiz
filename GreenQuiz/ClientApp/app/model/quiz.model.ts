import {Frage} from './frage.model'
export class Quiz {
    constructor() {

    }
   public Id: string;
   public Titel: string;
   public PersonId: string;
   public Fragen: Frage[];
}