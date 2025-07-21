import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './compontens/autenticación/login/login.component';
import { RegistroComponent } from './compontens/autenticación/registro/registro.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GestionPerfilComponent } from './compontens/dashboard/dashboard-admin/gestion-perfil/gestion-perfil.component';
import { TodasCitasComponent } from './compontens/dashboard/dashboard-admin/todas-citas/todas-citas.component';
import { VerMedicosComponent } from './compontens/dashboard/dashboard-admin/ver-medicos/ver-medicos.component';
import { VerPacientesComponent } from './compontens/dashboard/dashboard-admin/ver-pacientes/ver-pacientes.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { VerCitasMedicoComponent } from './compontens/dashboard/dashboard-medico/ver-citas/ver-citas-medico.component';
import { PerfilMedicoComponent } from './compontens/dashboard/dashboard-medico/perfil/perfil-medico.component';
import { MensajesMedicoComponent } from './compontens/dashboard/dashboard-medico/mensajes/mensajes-medico.component';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    GestionPerfilComponent,
    TodasCitasComponent,
    VerMedicosComponent,
    VerPacientesComponent,
    VerCitasMedicoComponent,
    PerfilMedicoComponent,
    MensajesMedicoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    MatSelectModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppModule { }
