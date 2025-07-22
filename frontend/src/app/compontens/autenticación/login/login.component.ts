import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      contrasena: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { dni, contrasena } = this.loginForm.value;

    this.http
      .post<any>('https://faithful-communication-production.up.railway.app/api/auth/login', { dni, contrasena })
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user)); 
          this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', {
            duration: 3000,
          });
          
  const user = res.user;

  if (user && user.rol) {
  
    if (user.rol === 'administrador') {
      this.router.navigate(['/dashboard-admin']);
    
    } else if(user.rol === 'medico'){
       this.router.navigate(['/dashboard-medico']);
    }
    else if (user.rol === 'paciente') {
      this.router.navigate(['/dashboard/panel-usuario']);
    }

  }
        },
        error: (err) => {
          const mensaje = err.error?.msg || 'Error al iniciar sesión';
          this.snackBar.open(mensaje, 'Cerrar', { duration: 3000 });
        },
      });
  }
}
