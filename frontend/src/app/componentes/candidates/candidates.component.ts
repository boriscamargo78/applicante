import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../../servicios/peticion.service';
import { MensajesService } from '../../servicios/mensajes.service';

declare var $:any

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.css'
})
export class CandidatesComponent implements OnInit {

  ngOnInit(): void {
    this.listar()

}

constructor(private peticion:PeticionService, private msg:MensajesService){}

name:string = ""
lastname:string = ""
email:string = ""
rol:string = ""
estado:string = ""
miId:string = ""

data:any[] = []

Nuevo(){  
  this.miId = ""
  this.name = ""
  this.lastname = ""
  this.email = ""
  this.rol = ""
  this.estado = "1"
  $('#exampleModal').modal('show')
}

guardar() {
  let post = {
    host: this.peticion.urlLocal,
    path: "/candidates/guardar",
    payload: {
      name: this.name,
      lastname: this.lastname,
      email: this.email,
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
    path: "/candidates/modificar",
    payload: {
      _id: this.miId,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
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
      path: "/candidates/listar",
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
      path: "/candidates/listarporId",
      payload: {
        _id:id,
      }
    };
  
    this.peticion.postUserData(post.host + post.path, post.payload)
      .then((res: any) => {
        console.log(res)

/*         this.name = res[0].name
        this.lastname = res[0].lastname
        this.email = res[0].email
        this.rol = res[0].rol

        $('#exampleModal').modal('show')
      });
  } */

  if (res && res.length > 0) {
    const candidate = res[0];

    this.name = candidate.name || "";
    this.lastname = candidate.lastname || "";
    this.email = candidate.email || "";
    this.rol = candidate.rol || "";
    this.estado = candidate.estado || "";

    $('#exampleModal').modal('show');
  } else {
    console.error("Candidate data not found.");
    // Handle the case where candidate data is not found.
  }
})
.catch((error: any) => {
  console.error(error);
  // Handle the error appropriately.
});
}

  eliminar(){
   
    let post = {
      host: this.peticion.urlLocal,
      path: "/candidates/eliminar",
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


