import { Antwort } from './antwort.model'
export class Frage {
    constructor() {

    }
    public Id: string;
    public Titel: string;
    public Antworten: Antwort[];
    public RichtigeAntwort: number;
} 