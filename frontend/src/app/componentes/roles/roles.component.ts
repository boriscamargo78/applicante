import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../../servicios/peticion.service';
import { MensajesService } from '../../servicios/mensajes.service';

declare var $:any

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {
  ngOnInit(): void {
    this.listar()

}

constructor(private peticion:PeticionService, private msg:MensajesService){}

role:string = ""
descripcion:string = ""
skills:string = ""
rol:string = ""
estado:string = ""
miId:string = ""

data:any[] = []

Nuevo(){  
  this.miId = ""
  this.role = ""
  this.descripcion = ""
  this.skills = ""
  this.rol = ""
  this.estado = "1"
  $('#exampleModal').modal('show')
}

guardar() {
  let post = {
    host: this.peticion.urlLocal,
    path: "/roles/guardar",
    payload: {
      role: this.role,
      descripcion: this.descripcion,
      skills: this.skills,
      rol: this.rol,
      estado: this.estado
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
    path: "/roles/modificar",
    payload: {
      _id: this.miId,
      role: this.role,
      descripcion: this.descripcion,
      skills: this.skills,
      rol: this.rol,
      estado: this.estado
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
      path: "/roles/listar",
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
      path: "/roles/listarporId",
      payload: {
        _id:id,
      }
    };
  
    this.peticion.postUserData(post.host + post.path, post.payload)
      .then((res: any) => {
        console.log(res)

        this.role = res[0].role
        this.descripcion = res[0].descripcion
        this.skills = res[0].skills
        this.rol = res[0].rol
        this.estado = res[0].estado
        $('#exampleModal').modal('show')
      });
  }

  eliminar(){
   
    let post = {
      host: this.peticion.urlLocal,
      path: "/roles/eliminar",
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



