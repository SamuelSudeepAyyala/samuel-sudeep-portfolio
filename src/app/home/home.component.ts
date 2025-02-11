import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true
})
export class HomeComponent {

  openWhatsApp() {
    window.open('https://wa.link/bk4p2s', '_blank');
  }


}
