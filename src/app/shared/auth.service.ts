import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(){
    const logedIn=localStorage.getItem('logedIn');
    if(logedIn==="true"){
      return true;
    }else{
      return false;
    }
   
  }
}
