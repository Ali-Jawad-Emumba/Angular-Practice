import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../../utils/services/main.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { usernameValidator } from '../../utils/validators/usernameValidator';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private mainService: MainService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [usernameValidator()]],
      password: [''],
    });
  }

  signIn() {
    const { username, password } = this.loginForm.value;
    if (username === 'Ali' && password === 'Ali') {
      this.mainService.isLoggedIn === true;
      this.router.navigate(['/practice']);
    } else {
      console.log('not working');
    }
  }
}
