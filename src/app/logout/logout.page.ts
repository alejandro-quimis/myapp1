import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
})
export class LogoutPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { 
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  ngOnInit() {
     this.authService.logout();
     this.router.navigate(["/login"]);
     window.location.reload();
  }

}
