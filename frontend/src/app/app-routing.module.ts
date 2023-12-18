import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { RegistrarComponent } from './componentes/registrar/registrar.component';
import { ContactenosComponent } from './componentes/contactenos/contactenos.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { ActivarcuentaComponent } from './componentes/activarcuenta/activarcuenta.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { UsersComponent } from './componentes/users/users.component';
import { CandidatesComponent } from './componentes/candidates/candidates.component';
import { RolesComponent } from './componentes/roles/roles.component';
import { ScheduleComponent } from './componentes/schedule/schedule.component';

const routes: Routes = [
  { path: "", component: HomeComponent,pathMatch:"full" },
  { path: "home", component: HomeComponent,pathMatch:"full"  },
  { path: "login", component: LoginComponent,pathMatch:"full"  },
  { path: "registro", component: RegistroComponent,pathMatch:"full"  },
  { path: "registrar", component: RegistrarComponent,pathMatch:"full"  },
  { path: "contactenos", component: ContactenosComponent,pathMatch:"full"  },
  { path: "dashboard", component: DashboardComponent,pathMatch:"full"  },
  { path: "users", component: UsersComponent,pathMatch:"full"  },
  { path: "candidates", component: CandidatesComponent,pathMatch:"full"  },
  { path: "roles", component: RolesComponent,pathMatch:"full"  },
  { path: "schedule", component: ScheduleComponent,pathMatch:"full"  },
  { path: "menu", component: MenuComponent }, // Example of using MenuComponent
  { path: "activarcuenta/:email/:codigo", component: ActivarcuentaComponent,pathMatch:"full"  },
  { path: "**", redirectTo: "/home" }, // Redirect unmatched routes to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

