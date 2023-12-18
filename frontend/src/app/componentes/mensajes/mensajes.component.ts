import { Component } from '@angular/core';
import { MensajesService } from '../../servicios/mensajes.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrl: './mensajes.component.css'
})
export class MensajesComponent {

  constructor(public msg: MensajesService){}

}
