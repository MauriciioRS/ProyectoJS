import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Cita {
  id: number;
  fecha: string;
  hora: string;
  doctor: string;
  especialidad: string;
  sede: string;
  estado: 'programada' | 'completada' | 'cancelada' | 'atendida';
}

interface Usuario {
  nombre: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
  direccion: string;
}

@Component({
  selector: 'app-panel-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './panel-usuario.component.html',
  styleUrls: ['./panel-usuario.component.css']
})
export class PanelUsuarioComponent implements OnInit {
  
  usuario: Usuario = {
    nombre: '',
    email: '',
    telefono: '',
    fechaNacimiento: '',
    direccion: ''
  };

  citasProgramadas: Cita[] = [];
  historialCitas: Cita[] = [];
  
  modoEdicion = false;
  mensaje = '';

  ngOnInit() {
    this.cargarDatosUsuario();
    this.cargarCitas();
  }

  cargarDatosUsuario() {
    const usuarioGuardado = localStorage.getItem('usuarioActual');
    if (usuarioGuardado) {
      const datos = JSON.parse(usuarioGuardado);
      this.usuario = {
        nombre: datos.nombre || 'Usuario',
        email: datos.email || '',
        telefono: datos.celular || datos.telefono || '',
        fechaNacimiento: datos.fechaNacimiento || '',
        direccion: datos.direccion || ''
      };
    }
  }

  cargarCitas() {
    // Cargar todas las citas desde localStorage
    const citasGuardadas = localStorage.getItem('citasAgendadas');
    if (citasGuardadas) {
      const todasLasCitas = JSON.parse(citasGuardadas);
      this.separarCitasPorFecha(todasLasCitas);
    } else {
      this.citasProgramadas = [];
      this.historialCitas = [];
    }
  }

  separarCitasPorFecha(todasLasCitas: Cita[]) {
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0); // Resetear a inicio del día

    this.citasProgramadas = [];
    this.historialCitas = [];

    todasLasCitas.forEach(cita => {
      const fechaCita = new Date(cita.fecha);
      fechaCita.setHours(0, 0, 0, 0);

      if (fechaCita >= fechaActual) {
        // Cita futura o de hoy - va a citas programadas
        this.citasProgramadas.push(cita);
      } else {
        // Cita pasada - va al historial
        if (cita.estado === 'programada') {
          cita.estado = 'atendida';
        }
        this.historialCitas.push(cita);
      }
    });

    // Guardar los cambios si se actualizaron estados
    localStorage.setItem('citasAgendadas', JSON.stringify([...this.citasProgramadas, ...this.historialCitas]));
  }



  activarEdicion() {
    this.modoEdicion = true;
    this.mensaje = '';
  }

  guardarCambios() {
    // Guardar cambios en localStorage
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || '{}');
    const usuarioActualizado = { ...usuarioActual, ...this.usuario };
    localStorage.setItem('usuarioActual', JSON.stringify(usuarioActualizado));
    
    this.modoEdicion = false;
    this.mensaje = 'Perfil actualizado correctamente';
    
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }

  cancelarEdicion() {
    this.cargarDatosUsuario();
    this.modoEdicion = false;
    this.mensaje = '';
  }

  cancelarCita(cita: Cita) {
    if (confirm('¿Estás seguro de que quieres cancelar esta cita?')) {
      this.citasProgramadas = this.citasProgramadas.filter(c => c.id !== cita.id);
      localStorage.setItem('citasAgendadas', JSON.stringify([...this.citasProgramadas, ...this.historialCitas]));
      this.mensaje = 'Cita cancelada correctamente';
      
      setTimeout(() => {
        this.mensaje = '';
      }, 3000);
    }
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'programada': return 'estado-programada';
      case 'completada': return 'estado-completada';
      case 'cancelada': return 'estado-cancelada';
      case 'atendida': return 'estado-atendida';
      default: return '';
    }
  }

  formatearFecha(fecha: string): string {
    if (!fecha) return '';
    try {
      const fechaObj = new Date(fecha);
      return fechaObj.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } catch (error) {
      return fecha; 
    }
  }
}
