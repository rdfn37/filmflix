import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';

import { AuthService } from './../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('login') loginForm!: NgForm;

  user$?: Observable<User | undefined>

  onSubmit() {
    console.log("oi")
    const email = this.loginForm.value.email as string;
    const password = this.loginForm.value.password as string;

    this.authService.login(email, password).subscribe({
     next: (creds) => {},
      error: (err) => {
        let message = 'Ocorreu um erro!';
        console.log(err.code)

        switch (err.code) {
          case 'auth/invalid-email':
            message = 'E-mail inválido';
            break;
          case 'auth/user-not-found':
            message = 'Usuário não encontrado';
            break;
        }

        this.snackBar.open(message, 'Fechar', {
          duration: 5000,
          horizontalPosition: 'end'
        });
      },
    });
  }

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
}
