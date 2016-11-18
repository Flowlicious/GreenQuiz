import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

@Component({
    selector: 'fetchdata',
    template: require('./fetchdata.component.html')
})
export class FetchDataComponent {
    public forecasts: WeatherForecast[];

    constructor(http: Http, authHttp: AuthHttp) {
        authHttp.get('/api/SampleData/WeatherForecasts').subscribe(result => {
            this.forecasts = result.json();
        },
            error => console.log(error._body || error)
            );
    }
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}
