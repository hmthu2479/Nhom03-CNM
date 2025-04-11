import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-forget-password',
  standalone:true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  forgerPassForm: FormGroup;
  http = inject(HttpClient)
  router = inject(Router)
  fb = inject(FormBuilder)
  loading: boolean = false;
  successMessage: boolean = false;
  visible: boolean = false;

  constructor(){
    this.forgerPassForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }
  onReset(){
    if(this.forgerPassForm.valid){
      setTimeout(() => {
        this.loading = false;
        this.successMessage = true;
        this.visible = true;
          // const successModal = new bootstrap.Modal(document.getElementById('successModal')!);
          // successModal.show();   
      }, 1500);
      
    //   this.loading = true;
    //   this.successMessage = false;
    //   console.log('forgerPassForm:', this.forgerPassForm.value);
      
      // setTimeout(()=>{
      //   this.loading = false;
      //   this.successMessage = true;
      //   if(this.successMessage) {
      //     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
      //   }
      //   setTimeout(() => {
      //     this.router.navigateByUrl('auth');
      //   }, 2000);
      // },10000)
      // this.http.post("https://reqres.in/api/login", this.forgerPassForm.value).subscribe((res:any)=>{
      //   this.loading = false;
      //   if(res.token){
      //     this.successMessage = true;
      //     setTimeout(() => {
      //       this.router.navigateByUrl('auth');
      //     }, 2000);
      //   }else{
      //     console.log(res.message)
      //   }
      // })
    } else {
      console.log('Form is invalid');
    }
  }
}
