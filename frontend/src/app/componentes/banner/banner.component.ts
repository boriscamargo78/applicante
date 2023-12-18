import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {

  constructor() { }

  openLogin() {
    // Use window.location.href to navigate to the login page
    window.location.href = '/login'; // Replace '/login' with the actual URL of your login page
  }

  openRegistrar() {
    // Use window.location.href to navigate to the registro page
    window.location.href = '/registrar'; // Replace '/registro' with the actual URL of your registro page
  }
}










