import { Injectable } from "@angular/core";
import { CanActivateChild, Router } from "@angular/router";

import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  constructor(
    private authService:AuthService,
    private router:Router
  ){}

  canActivateChild(){
    
    if(this.authService.isLoggedIn()){
      
      return true;
    }else{
      
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
