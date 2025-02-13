import { Component, OnInit,Input } from '@angular/core';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true
})
export class HomeComponent implements OnInit {
  version: string = "1.0.0";
  menuOpen: boolean = false;
  to_name: string = "Samuel Sudeep Ayyala";

  constructor(private emailService: EmailService) { } 

  ngOnInit(): void {
    // Assign functions to window so they can be used in the template
    (window as any).toggleMenu = this.toggleMenu;
    (window as any).closeMenu = this.closeMenu;
    (window as any).scrollToTop = this.scrollToTop;

  }

  showAlert() {
    const alert = document.getElementById('custom-alert');
    if (alert) {
      alert.style.display = 'block';
      setTimeout(() => {
        alert.style.display = 'none';
      }, 3000);
    }
  }

  

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }


  onSubmit(event: any): void {
    event.preventDefault();

    const form = event.target;
    const from_name = form.name.value;
    const from_email = form.email.value;
    const message = form.message.value;

    console.log('Form submitted!', { from_name, from_email, message });
    const formData = {
      to_name: this.to_name,
      from_name: from_name,
      from_email: from_email,
      message: message
    };

    this.emailService.sendEmail(formData)
      .then(response => {
        console.log('Email sent successfully:', response);
        this.showAlert();
        document.querySelector('form')?.reset();
      })
      .catch(error => {
        console.error('Error sending email:', error);
        alert('Sorry, something went wrong. Please try using the Lets Talk Button.');
      });

    form.reset();
  }

  // Close the menu when clicking a link
  closeMenu(): void {
    const menu = document.getElementById("navbar-menu");
    if (menu) {
      menu.classList.remove("active");
    }
  }

  // Scroll back to the top when clicking the logo
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  openWhatsApp() {
    window.open('https://wa.link/bk4p2s', '_blank');
  }


}
