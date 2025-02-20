import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms"
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  standalone:true,
  templateUrl: './auth.component.html',
  // styleUrl: './auth.component.css'
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  registerForm: FormGroup;
  loginForm: FormGroup;
  http = inject(HttpClient)
  router = inject(Router)
  fb = inject(FormBuilder)

  constructor(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]]
    })
    this.registerForm = this.fb.group({
      name:['', [Validators.required]],
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onLogin(){
    if(this.loginForm.valid){
      console.log('loginObj:', this.loginForm.value); 
      this.http.post("https://reqres.in/api/login", this.loginForm.value).subscribe((res:any)=>{
        if(res.token){
          this.router.navigateByUrl('dashboard')
        }else{
          console.log(res.message)
        }
      })
    } else {
      console.log('Form is invalid');
    }
  }
  onRegister(){
    if(this.registerForm.valid){
      console.log('registerObj:', this.registerForm); 
      this.http.post("https://fakestoreapi.com/users", this.registerForm.value).subscribe((res:any)=>{
        // if(res.token){
        //   this.router.navigateByUrl('dashboard')
        // }else{
        //   console.log(res.message)
        // }
        if(res.id){
          this.router.navigateByUrl('dashboard')
        }else{
          console.log(res.message)
        }
      })
    } else {
      console.log('Form is invalid');
    }
  }
}

