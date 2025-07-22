import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-panel-usuario',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './panel-usuario.component.html',
  styleUrls: ['./panel-usuario.component.scss']
})
export class PanelUsuarioComponent implements OnInit {
  user: any = null;
  citasHistorial: any[] = [];
  historialError: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const dni = parsedUser?.dni;
      const rol = parsedUser?.rol;

      if (dni) {
        this.obtenerUsuario(dni);
        if (rol) {
          this.obtenerHistorialCitas(dni, rol);
        }
      }
    }
  }

  obtenerUsuario(dni: string): void {
    const token = localStorage.getItem('token');

    fetch(`https://proyectojs-production.up.railway.app/api/usuarios/${dni}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token || ''}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) throw new Error('Error al obtener usuario');
      return res.json();
    })
    .then(data => {
      this.user = data;
    })
    .catch(err => {
      console.error('Error al obtener el usuario:', err);
    });
  }

  obtenerHistorialCitas(dni: string, rol: string): void {
    const token = localStorage.getItem('token');

    fetch(`https://proyectojs-production.up.railway.app/api/citas/usuario?dni=${dni}&rol=${rol}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token || ''}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) throw new Error('No se pudo cargar el historial de citas');
      return res.json();
    })
   .then(data => {
  this.citasHistorial = data.citas || [];
   })
    .catch(err => {
      console.error('Error al cargar historial de citas:', err);
      this.historialError = true;
    });
  }

  irAgendarCita(): void {
    this.router.navigate(['/agendar-cita']);
  }

  cancelarCita(id: number): void {
  const token = localStorage.getItem('token');
  if (!confirm('¿Estás seguro de cancelar esta cita?')) return;

  fetch(`https://proyectojs-production.up.railway.app/api/citas/cancelar/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token || ''}`,
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (!res.ok) throw new Error('No se pudo cancelar la cita');
    // Elimina la cita del historial localmente
    this.citasHistorial = this.citasHistorial.filter(cita => cita.id !== id);
  })
  .catch(err => {
    alert('Error al cancelar la cita');
    console.error('Error al cancelar la cita:', err);
  });
}

}
