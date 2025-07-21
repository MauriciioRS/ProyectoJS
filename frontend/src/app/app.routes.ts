import { Routes } from '@angular/router';
import { LoginComponent } from './compontens/autenticación/login/login.component';
import { RegistroComponent } from './compontens/autenticación/registro/registro.component';
import { DashboardAdminComponent } from './compontens/dashboard/dashboard-admin/dashboard-admin.component';
import { DashboardMedicoComponent } from './compontens/dashboard/dashboard-medico/dashboard-medico.component';
import { LandingComponent } from './compontens/landing/landing.component';
import { NosotrosComponent } from './compontens/navbar/nosotros/nosotros.component';
import { ServiciosComponent } from './compontens/navbar/servicios/servicios.component';
import { PanelUsuarioComponent } from './compontens/navbar/panel-usuario/panel-usuario.component';
import { AgendarCitaComponent } from './compontens/navbar/agendar-cita/agendar-cita.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'dashboard-admin', component: DashboardAdminComponent },
  { path: 'dashboard-medico', component: DashboardMedicoComponent },
  { path: 'agendar-cita', component: AgendarCitaComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'dashboard/panel-usuario', component: PanelUsuarioComponent },
];
