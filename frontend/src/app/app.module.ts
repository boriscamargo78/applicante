import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ContactenosComponent } from './componentes/contactenos/contactenos.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { BannerComponent } from './componentes/banner/banner.component';
import { CounterComponent } from './componentes/counter/counter.component';
import { DispositivosComponent } from './componentes/dispositivos/dispositivos.component';
import { Hero01Component } from './componentes/hero01/hero01.component';
import { TarjetasComponent } from './componentes/tarjetas/tarjetas.component';
import { AboutusComponent } from './componentes/aboutus/aboutus.component';
import { HerocloseComponent } from './componentes/heroclose/heroclose.component';
import { BlogComponent } from './componentes/blog/blog.component';
import { FaqComponent } from './componentes/faq/faq.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RegistrarComponent } from './componentes/registrar/registrar.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MensajesComponent } from './componentes/mensajes/mensajes.component';
import { ActivarcuentaComponent } from './componentes/activarcuenta/activarcuenta.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { MenulateralComponent } from './componentes/menulateral/menulateral.component';
import { MenusuperiorComponent } from './componentes/menusuperior/menusuperior.component';
import { UsersComponent } from './componentes/users/users.component';
import { InterceptorService } from './servicios/interceptor.service';
import { CandidatesComponent } from './componentes/candidates/candidates.component';
import { RolesComponent } from './componentes/roles/roles.component';
import { MenuinternoComponent } from './componentes/menuinterno/menuinterno.component';
import { StepsComponent } from './componentes/steps/steps.component';
import { CounterinternoComponent } from './componentes/counterinterno/counterinterno.component';
import { TituloseccionComponent } from './componentes/tituloseccion/tituloseccion.component';
import { CalendarioComponent } from './componentes/calendario/calendario.component';
import { ScheduleComponent } from './componentes/schedule/schedule.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    ContactenosComponent,
    MenuComponent,
    FooterComponent,
    BannerComponent,
    CounterComponent,
    DispositivosComponent,
    Hero01Component,
    TarjetasComponent,
    AboutusComponent,
    HerocloseComponent,
    BlogComponent,
    FaqComponent,
    RegistrarComponent,
    MensajesComponent,
    ActivarcuentaComponent,
    DashboardComponent,
    MenulateralComponent,
    MenusuperiorComponent,
    UsersComponent,
    CandidatesComponent,
    RolesComponent,
    MenuinternoComponent,
    StepsComponent,
    CounterinternoComponent,
    TituloseccionComponent,
    CalendarioComponent,
    ScheduleComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass:InterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
