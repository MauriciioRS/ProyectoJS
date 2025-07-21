import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, RouterModule, CommonModule]
})
export class NavbarComponent {
  get loggedIn() {
    return !!localStorage.getItem('rol');
  }

  get rolUsuario() {
    return localStorage.getItem('rol') === 'usuario';
  }

  get rolAdmin() {
    return localStorage.getItem('rol') === 'admin';
  }

  get rolMedico() {
    return localStorage.getItem('rol') === 'medico';
  }

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private router: Router) {
    iconRegistry.addSvgIcon(
      'x',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/x.svg')
    );
    iconRegistry.addSvgIcon(
      'instagram',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/instagram.svg')
    );
    iconRegistry.addSvgIcon(
      'dribbble',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/dribbble.svg')
    );
  }

  logout() {
    // Solo eliminar datos de sesión, mantener usuarios registrados
    localStorage.removeItem('rol');
    localStorage.removeItem('usuarioActual');
    this.router.navigate(['/']);
  }
} 