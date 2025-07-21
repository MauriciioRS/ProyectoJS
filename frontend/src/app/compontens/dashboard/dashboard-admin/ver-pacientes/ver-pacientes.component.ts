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
  selector: 'app-ver-pacientes',
  standalone: true,
  templateUrl: './ver-pacientes.component.html',
  styleUrls: ['./ver-pacientes.component.css'],
  imports: [CommonModule, MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, MatIconModule]
})
export class VerPacientesComponent {
  usuarios: Usuario[] = [];
  busqueda: string = '';
  modoEdicion: boolean = false;
  pacienteEditando: Usuario | null = null;
  mostrarFormulario: boolean = false;
  nuevoPaciente: Usuario = { nombre: '', email: '', rol: 'usuario', estado: 'activo', dni: '', celular: '' };

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    const data = localStorage.getItem('usuarios');
    this.usuarios = data ? JSON.parse(data) : [];
  }

  get pacientesFiltrados() {
    return this.usuarios.filter(u =>
      u.rol === 'usuario' &&
      (!this.busqueda || u.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) || u.email.toLowerCase().includes(this.busqueda.toLowerCase()))
    );
  }

  eliminarPaciente(paciente: Usuario) {
    this.usuarios = this.usuarios.filter(u => u !== paciente);
    this.guardarUsuarios();
  }

  editarPaciente(paciente: Usuario) {
    this.modoEdicion = true;
    this.pacienteEditando = { ...paciente };
    this.mostrarFormulario = false;
  }

  guardarEdicion() {
    if (this.pacienteEditando) {
      const idx = this.usuarios.findIndex(u => u.email === this.pacienteEditando!.email && u.rol === 'usuario');
      if (idx !== -1) this.usuarios[idx] = { ...this.pacienteEditando };
      this.guardarUsuarios();
      this.modoEdicion = false;
      this.pacienteEditando = null;
    }
  }

  cancelarEdicion() {
    this.modoEdicion = false;
    this.pacienteEditando = null;
  }

  mostrarFormNuevoPaciente() {
    this.mostrarFormulario = true;
    this.modoEdicion = false;
    this.nuevoPaciente = { nombre: '', email: '', rol: 'usuario', estado: 'activo', dni: '', celular: '' };
  }

  agregarPaciente() {
    this.usuarios.push({ ...this.nuevoPaciente });
    this.guardarUsuarios();
    this.mostrarFormulario = false;
    this.nuevoPaciente = { nombre: '', email: '', rol: 'usuario', estado: 'activo', dni: '', celular: '' };
  }

  guardarUsuarios() {
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }
} 