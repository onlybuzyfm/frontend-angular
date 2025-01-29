import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    }

    )
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.authService.login(this.f['username'].value, this.f['password'].value).pipe(first()).subscribe(
      data => {
        console.log(data)
        this.router.navigate([''])
      }
    )
  }

  goBack() {
    this.router.navigate(['/'])
  }

}
