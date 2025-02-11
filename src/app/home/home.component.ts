import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true
})
export class HomeComponent implements OnInit {

  constructor(private emailService: EmailService) { } 

  ngOnInit(): void {
    // Assign functions to window so they can be used in the template
    (window as any).toggleMenu = this.toggleMenu;
    (window as any).closeMenu = this.closeMenu;
    (window as any).scrollToTop = this.scrollToTop;

  }

  onSubmit(event: any): void {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    console.log('Form submitted!', { name, email, message });
    const formData = {
      name: name,
      email: email,
      message: message
    };

    this.emailService.sendEmail(formData)
      .then(response => {
        console.log('Email sent successfully:', response);
        // Optionally, reset the form after submission
        document.querySelector('form')?.reset();
      })
      .catch(error => {
        console.error('Error sending email:', error);
      });

    form.reset();
  }


  // Toggle the menu for mobile view
  toggleMenu(): void {
    const menu = document.getElementById("navbar-menu");
    if (menu) {
      menu.classList.toggle("active");
    }
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
