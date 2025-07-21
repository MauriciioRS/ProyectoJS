import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required], 
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (email === 'admin' && password === 'admin') {
        localStorage.setItem('rol', 'admin');
        this.router.navigate(['/dashboard-admin']);
      } else if (email === 'medico' && password === 'medico') {
        localStorage.setItem('rol', 'medico');
        this.router.navigate(['/dashboard-medico']);
      } else {
        // Validar contra usuarios registrados
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const usuario = usuarios.find((u: any) => u.email === email && u.password === password);
        if (usuario) {
          localStorage.setItem('rol', 'usuario');
         
          localStorage.setItem('usuarioActual', JSON.stringify(usuario));
          this.router.navigate(['/dashboard/panel-usuario']);
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      }
    }
  }
}
