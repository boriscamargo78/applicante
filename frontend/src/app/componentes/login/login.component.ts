import { Component } from '@angular/core';
import { PeticionService } from '../../servicios/peticion.service';
import { MensajesService } from '../../servicios/mensajes.service';
import { Router } from '@angular/router'; // Correct import

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  
})
export class LoginComponent {

  constructor(
    private peticion: PeticionService, 
    private msg: MensajesService,
    private router: Router // Correct injection
  ) {}

  email: string = "";
  password: string = "";

  login() {
      let post = {
      host: this.peticion.urlLocal,
      path: "/users/login",
      payload: {
        email: this.email,
        password: this.password
      }
    }

    this.peticion.postUserData(post.host + post.path, post.payload)
      .then((res: any) => {
        console.log("Response from server:", res);
        if (res.state == false) {
          this.msg.Load("danger", res.mensaje);
        } else {
          this.msg.Load("success", res.mensaje);
          console.log("Navegando a Dashboard")
          this.router.navigate(["/dashboard"]);
        }
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
}





