import { Component} from '@angular/core';
import {NavComponent} from './nav.component'
@Component({
  selector: 'app-root',
  template: `
  <nav-bar></nav-bar>
  <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
