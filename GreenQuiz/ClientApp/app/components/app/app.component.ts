/// <reference path="../../services/feed.service.ts" />
import { Component } from '@angular/core';
import { FeedService } from '../../services/feed.service';
import { SignalRConnectionStatus } from '../../model/quizhub';

@Component({
    selector: 'app',
    template: require('./app.component.html'),
    styles: [require('./app.component.css')],
    providers: [FeedService]
})
export class AppComponent {
    constructor(private feedService: FeedService) {

    }

    ngOnInit() {
        this.feedService.start(true).subscribe(null, error => console.log('Error on init: ' + error));
    }
}
