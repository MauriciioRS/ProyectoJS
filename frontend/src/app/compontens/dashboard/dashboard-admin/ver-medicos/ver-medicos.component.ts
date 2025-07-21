import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

interface Usuario {
  nombre: string;
  email: string;
  rol: string;
  estado: 'activo' | 'inactivo';
  dni: string;
  celular: string;
}

@Component({
  selector: 'app-ver-medicos',
  standalone: true,
  templateUrl: './ver-medicos.component.html',
  styleUrls: ['./ver-medicos.component.css'],
  imports: [CommonModule, MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, MatIconModule]
})
export class VerMedicosComponent {
  usuarios: Usuario[] = [];
  busqueda: string = '';
  modoEdicion: boolean = false;
  medicoEditando: Usuario | null = null;
  mostrarFormulario: boolean = false;
  nuevoMedico: Usuario = { nombre: '', email: '', rol: 'medico', estado: 'activo', dni: '', celular: '' };

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    const data = localStorage.getItem('usuarios');
    this.usuarios = data ? JSON.parse(data) : [];
  }

  get medicosFiltrados() {
    return this.usuarios.filter(u =>
      u.rol === 'medico' &&
      (!this.busqueda || u.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) || u.email.toLowerCase().includes(this.busqueda.toLowerCase()))
    );
  }

  eliminarMedico(medico: Usuario) {
    this.usuarios = this.usuarios.filter(u => u !== medico);
    this.guardarUsuarios();
  }

  editarMedico(medico: Usuario) {
    this.modoEdicion = true;
    this.medicoEditando = { ...medico };
    this.mostrarFormulario = false;
  }

  guardarEdicion() {
    if (this.medicoEditando) {
      const idx = this.usuarios.findIndex(u => u.email === this.medicoEditando!.email && u.rol === 'medico');
      if (idx !== -1) this.usuarios[idx] = { ...this.medicoEditando };
      this.guardarUsuarios();
      this.modoEdicion = false;
      this.medicoEditando = null;
    }
  }

  cancelarEdicion() {
    this.modoEdicion = false;
    this.medicoEditando = null;
  }

  mostrarFormNuevoMedico() {
    this.mostrarFormulario = true;
    this.modoEdicion = false;
    this.nuevoMedico = { nombre: '', email: '', rol: 'medico', estado: 'activo', dni: '', celular: '' };
  }

  agregarMedico() {
    this.usuarios.push({ ...this.nuevoMedico });
    this.guardarUsuarios();
    this.mostrarFormulario = false;
    this.nuevoMedico = { nombre: '', email: '', rol: 'medico', estado: 'activo', dni: '', celular: '' };
  }

  guardarUsuarios() {
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }
} 