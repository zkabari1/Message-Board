import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Subject} from 'rxjs';
import {AuthService} from './auth.service'

@Injectable()
export class WebService{
    BASE_URL='http://localhost:1234/api'
    private messageStore=[];
    private messageSubject = new Subject();
    constructor(private http:HttpClient,private sb:MatSnackBar, private auth:AuthService){
        this.getMessages('');
    }
    messages=this.messageSubject.asObservable();
    getMessages(user){
            user = (user) ? '/' + user : '';
            this.http.get(this.BASE_URL+'/messages'+user).subscribe(response=>{
                this.messageStore = Object.values(response);
                this.messageSubject.next(this.messageStore);
            },error=> {
            this.handleError("Unable to get messages");
            })
        }

    async postMessage(message){
        try {
            var response = await this.http.post(this.BASE_URL+'/messages',message).toPromise();
            this.messageStore.push(response);
            this.messageSubject.next(this.messageStore);
        } catch (error) {
            this.handleError("Unable to post message");
        }
        
    }

    getUser(){
        return this.http.get(this.BASE_URL+'/users/me',this.auth.tokenHeader)
    }

    saveUser(userData){
        return this.http.post(this.BASE_URL+'/users/me',userData,this.auth.tokenHeader)
    }

    private handleError(error){
        console.error(error);
        this.sb.open(error,'close',{duration:2000});
        }
}