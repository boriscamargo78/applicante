import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface UserPayload {
  name: string;
  lastname: string;
  email: string;
  codigo: string
  password: string;
  rol: string;
  _id: string;
}

interface VacantesPayload {
  role: string;
  descripcion: string;
  skills: string;
  rol: string
  estado: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface ActivarPayload {
  email: string;
  codigo: string;
}

interface OtherPayload {
  name: string;
  lastname: string;
  rol: string;
}

interface EditPayload {
  _id: string;
}
 
@Injectable({
  providedIn: 'root'
})
export class PeticionService {

  constructor(private http: HttpClient) { }

  urlLocal: string = "http://localhost:3000";

  postUserData(url: string, userData: UserPayload | LoginPayload | ActivarPayload | OtherPayload | EditPayload | VacantesPayload): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(url, userData)
        .toPromise()
        .then((res: any) => {
          console.log("Success:", res);
          resolve(res);
        })
        .catch((error) => {
          console.error("Error:", error);
          reject(error);
        });
    });
  }

  getUserData(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(url)
        .toPromise()
        .then((res: any) => {
          console.log(res);
          resolve(res);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  }
}


