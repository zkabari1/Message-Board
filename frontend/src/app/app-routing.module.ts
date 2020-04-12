import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { MessagesComponent } from './messages.component';
import { RegisterComponent } from './register.component';
import {LoginComponent} from './login.component'
import { UserComponent } from './user.component';

const routes: Routes = [
  {
  path:'',
  component:HomeComponent 
  },
  {
    path:'messages',
    component:MessagesComponent
  },
  {
    path:'messages/:name',
    component:MessagesComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'user',
    component:UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
