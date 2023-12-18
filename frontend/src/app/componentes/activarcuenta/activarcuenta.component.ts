import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Import Router
import { PeticionService } from '../../servicios/peticion.service';
import { MensajesService } from '../../servicios/mensajes.service';

@Component({
  selector: 'app-activarcuenta',
  templateUrl: './activarcuenta.component.html',
  styleUrls: ['./activarcuenta.component.css']
})
export class ActivarcuentaComponent implements OnInit {
  email: string = "";
  codigo: string = "";

  constructor(
    private actroute: ActivatedRoute,
    private peticion: PeticionService,
    private msg: MensajesService,
    private router: Router  // Inject Router
  ) {}

  ngOnInit(): void {
    this.email = this.actroute.snapshot.params["email"];
    this.codigo = this.actroute.snapshot.params["codigo"];
    console.log('Email:', this.email);
    console.log('Codigo:', this.codigo);
  }

  Activar() {
    console.log('Activar method called');
    let post = {
      host: this.peticion.urlLocal,
      path: "/users/activarcuenta",
      payload: {
        email: this.email,
        codigo: this.codigo
      }
    };

    this.peticion.postUserData(post.host + post.path, post.payload)
      .then((res: any) => {
        console.log(res);
        if (res.state == false) {
          this.msg.Load("danger", res.mensaje);
        } else {
          this.msg.Load("success", res.mensaje);
          this.router.navigate(["/login"]);  // Use the Router service to navigate
        }
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
}


