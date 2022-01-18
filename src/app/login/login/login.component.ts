import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import * as CryptoJS from "crypto-js";

import { ApiService } from "../../shared/api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm !: FormGroup;
  
  constructor(
    private formBuilder : FormBuilder,
    private api:ApiService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    const emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    
    this.loginForm = this.formBuilder.group({
      email : ['',Validators.required],
      password : ['',Validators.required]
    })
  }

  login(){
    this.api.getManager().subscribe(res=>{
     const user=res.find((a:any)=>{
       return a.email === this.loginForm.value.email && CryptoJS.AES.decrypt(a.password, a.email).toString(CryptoJS.enc.Utf8) === this.loginForm.value.password
     });
     if(user){
       localStorage.setItem('logedIn',"true");
       alert("Login Success");
       this.loginForm.reset();
       this.router.navigate(['dashboard'])
     }else{
       alert("user not found");
     }
    },err=>{
      alert("Something went wrong")
    })
  }

}
