import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

   constructor(
      private router: Router,
      private authService: AuthService ) { }
  



  login(){
    this.router.navigate(['/login']);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(["/login"])
  }

}
