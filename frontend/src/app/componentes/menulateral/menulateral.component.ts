import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../../servicios/peticion.service';
import { MensajesService } from '../../servicios/mensajes.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menulateral',
  templateUrl: './menulateral.component.html',
  styleUrl: './menulateral.component.css'
})
export class MenulateralComponent implements OnInit{

  ngOnInit(): void {
      this.State()
  }

constructor(
  private peticion:PeticionService, private msg:MensajesService, private router:Router
) {}

name:string = "Cargando..."
rol:string = "Cargando..."

State() {

    let post = {
      host: this.peticion.urlLocal,
      path: "/users/State",
      payload: {
      } as any
    };
  
    this.peticion.postUserData(post.host + post.path, post.payload)
      .then((res:any) => {
        console.log(res);
        this.name = res.name
        this.rol = res.rol
        
      });
  }

  Logout() {
    let post = {
      host: this.peticion.urlLocal,
      path: "/users/Logout",
      payload: {} as any//Payload vacio
    }
  
    this.peticion.postUserData(post.host + post.path,post.payload)
      .then((res:any) => {
        console.log(res)
       if(res.state == true){
        this.msg.Load("Success",res.mensaje)
        this.router.navigate(["/login"])
       }
        
      })
  }

}

