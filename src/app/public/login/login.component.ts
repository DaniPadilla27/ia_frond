import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],

  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onLogin() {
    // Datos de usuario simulados
    const validEmail = 'jose.vasconcelos@mail.com';
    const validPassword = '123456';

    if (this.email === validEmail && this.password === validPassword) {
      // Login exitoso: redirige a la vista del plantel
      this.errorMessage = '';
      this.router.navigate(['/plantel']);
    } else {
      // Credenciales incorrectas
      this.errorMessage = 'Credenciales incorrectas. Intenta de nuevo.';
    }
  }
}
