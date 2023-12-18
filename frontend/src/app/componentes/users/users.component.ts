import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../../servicios/peticion.service';
import { MensajesService } from '../../servicios/mensajes.service';

declare var $:any

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  ngOnInit(): void {
      this.listar()
  }


constructor(private peticion:PeticionService, private msg:MensajesService){}

name:string = ""
lastname:string = ""
email:string = ""
password:string = ""
rol:string = "2"
contrasena:String = ""
miId:string = ""

data:any[] = []

Nuevo(){  
  this.miId = ""
  this.name = ""
  this.lastname = ""
  this.email = ""
  this.rol = "2"
  $('#exampleModal').modal('show')
}

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
        this.listar()
        $('#exampleModal').modal('hide')
      }
    })
    .catch((error: any) => {
      console.error(error);
    });
}

actualizar() {
  let post = {
    host: this.peticion.urlLocal,
    path: "/users/modificar",
    payload: {
      _id: this.miId,
      name: this.name,
      lastname: this.lastname,
      rol: this.rol,
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
        this.listar()
        $('#exampleModal').modal('hide')
      }
    })
    .catch((error: any) => {
      console.error(error);
    });
}

listar() {

    let post = {
      host: this.peticion.urlLocal,
      path: "/users/listar",
      payload: {
      } as any
    };
  
    this.peticion.postUserData(post.host + post.path, post.payload)
      .then((res:any) => {
        console.log(res);
this.data = res
        
      });
  }

  EditarId(id:string) {
    this.miId = id
    let post = {
      host: this.peticion.urlLocal,
      path: "/users/listarporId",
      payload: {
        _id:id,
      }
    };
  
    this.peticion.postUserData(post.host + post.path, post.payload)
      .then((res: any) => {
        console.log(res)

        this.name = res[0].name
        this.lastname = res[0].lastname
        this.rol = res[0].rol
        this.email = res[0].email
        $('#exampleModal').modal('show')
      });
  }

  eliminar(){
   
    let post = {
      host: this.peticion.urlLocal,
      path: "/users/eliminar",
      payload: {
        _id:this.miId,
      }
    }
  
    this.peticion.postUserData(post.host + post.path, post.payload)
      .then((res: any) => {
        console.log(res)
        $('#exampleModal').modal('hide')
        this.listar()
      })
  }
}




