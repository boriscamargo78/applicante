import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }

data:any[] =[]

Load(tipo:string,mensaje:string){
  this.data.push({tipo:tipo,mensaje:mensaje})
  setTimeout(() => {
    this.data.splice(0,1)
  }, 3000);
}

}
