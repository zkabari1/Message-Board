import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Router} from '@angular/router'

@Injectable()

export class AuthService{
    BASE_URL='http://localhost:1234/auth';

    NAME_KEY = 'name';
    TOKEN_KEY = 'token';

    get name(){
        return localStorage.getItem(this.NAME_KEY);
    }
    
    get isAuthenticated(){
        return !!localStorage.getItem(this.TOKEN_KEY)
    }

    get tokenHeader(){
        const httpOptions = {
            headers: new HttpHeaders({
              'Authorization': 'Bearer '+localStorage.getItem(this.TOKEN_KEY)
            })
          };
        return httpOptions
    }
    constructor(private http:HttpClient, private router:Router){}
    register(user){
        delete user.confirmPassword;
        this.http.post(this.BASE_URL+'/register',user).subscribe(res=>{
            this.authenticate(res);    
        });
    }
    logout(){
        localStorage.removeItem(this.NAME_KEY);
        localStorage.removeItem(this.TOKEN_KEY)
    }
    login(loginData){
        this.http.post(this.BASE_URL+'/login',loginData).subscribe(res=>{
            this.authenticate(res)
        })
    }
    authenticate(res){
        if(!res['token'])
                return;
            localStorage.setItem(this.TOKEN_KEY,res['token']);
            localStorage.setItem(this.NAME_KEY,res['firstName'])
            this.router.navigate(['/'])
    }
}