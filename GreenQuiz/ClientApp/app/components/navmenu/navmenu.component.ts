/// <reference path="../../auth/auth.service.ts" />
import { Component } from '@angular/core';
import {Auth} from '../../auth/auth.service';

@Component({
    selector: 'nav-menu',
    template: require('./navmenu.component.html'),
    styles: [require('./navmenu.component.css')],
    providers:[Auth]
})
export class NavMenuComponent {
    constructor(private auth: Auth) {

    }
}
