import { Component } from '@angular/core';
import { PeticionService } from '../../servicios/peticion.service';
import { MensajesService } from '../../servicios/mensajes.service';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']  
})
export class RegistrarComponent {

  constructor(private peticion:PeticionService,private msg:MensajesService ){}

  name:string = ""
  lastname:string = ""
  email:string = ""
  password:string = ""

  guardar() {
    let post = {
      host: this.peticion.urlLocal,
      path: "/users/guardar",
      payload: {
        name: this.name,
        lastname: this.lastname,
        email: this.email,
        password: this.password
      }
    };
  
    this.peticion.postUserData(post.host + post.path, post.payload)
      .then((res: any) => {
        console.log(res);
        if(res.state == false){
          this.msg.Load("danger",res.mensaje)
        }
        else{
          this.msg.Load("success",res.mensaje)
        }
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
   
}
