import { Component} from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms';
import {AuthService} from './auth.service'
@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styles:[`
    .error{
        background-color:#fff0f0
    }
  `] 
})
export class RegisterComponent {
    form;
    constructor(private fb:FormBuilder, private authService:AuthService){
        this.form=fb.group({
            firstName:[,Validators.required],
            lastName:[,Validators.required],
            email:[,[Validators.required,emailValid()]],
            password:[,Validators.required],
            confirmPassword:[,Validators.required]
        }, {validator:matchingFields('password','confirmPassword')})
    }
    onSubmit(){
        console.log(this.form.errors);
        this.authService.register(this.form.value);
    }
    isValid(control){
        return this.form.controls[control].invalid && this.form.controls[control].touched
    }
}

function matchingFields(field1,field2){
    return form =>{
        if(form.controls[field1].value !== form.controls[field2].value)
            return {misMatchedFields : true}
    }
}

function emailValid(){
    return control=>{
        var regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(control.value) ? null : {invalidEmail: true}
    }
}