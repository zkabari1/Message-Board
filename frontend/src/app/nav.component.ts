import {Component} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AuthService} from './auth.service'

@Component({
    selector:'nav-bar',
    template:`
        <mat-toolbar color="primary">
            <button mat-raised-button color="primary" routerLink="/">Message Board</button>
            <button mat-raised-button color="primary" routerLink="/messages">Messages</button>
            <span style="flex: 1 1 auto"></span>
            <button mat-raised-button color="primary"
            *ngIf="!authService.isAuthenticated" routerLink="/register">Register</button>
            <button mat-raised-button color="primary"
            *ngIf="!authService.isAuthenticated" routerLink="/login">Login</button>
            <button mat-raised-button *ngIf="authService.isAuthenticated" color="primary" routerLink="/user">Welcome {{authService.name}} </button>
            <button mat-raised-button *ngIf="authService.isAuthenticated" color="primary" (click)="authService.logout()">Logout</button>
        </mat-toolbar>
    `
})

export class NavComponent{
    constructor(public authService:AuthService){}
}