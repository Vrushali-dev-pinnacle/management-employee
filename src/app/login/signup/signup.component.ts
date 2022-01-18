import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import * as CryptoJS from "crypto-js";

import { ApiService } from "../../shared/api.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
  public signupForm !: FormGroup;
  emailValidation: boolean = true;

  constructor(
    private formBuilder : FormBuilder,
    private api:ApiService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email : ['',Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
      password : ['',Validators.required],
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      address:['',Validators.required],
      birthDate:['',Validators.required]
    })
  }

  signUp(){
    this.api.getManager().subscribe(res=>{
      const user=res.find((a:any)=>{
        return a.email !== this.signupForm.value.email 
      });
      if(user){
        this.signupForm.value.password=CryptoJS.AES.encrypt(this.signupForm.value.password,this.signupForm.value.email).toString();
        
        this.api.postManager(this.signupForm.value).subscribe(res=>{
        alert("Signup Successfull!!");
        this.signupForm.reset();
        this.router.navigate(['login'])
        },err=>{
        alert("Something went wrong");
        })
      }
    });
  }

}
