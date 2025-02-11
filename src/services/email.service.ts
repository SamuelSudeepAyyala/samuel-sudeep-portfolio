import { Injectable } from '@angular/core';
import * as emailjs from 'emailjs-com';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }

  sendEmail(formData: any) {
    const serviceID = environment.emailjs.serviceID;
    const templateID = environment.emailjs.templateID;
    const userID = environment.emailjs.userID;

    return new Promise((resolve, reject) => {
      emailjs.send(serviceID, templateID, formData, userID)
        .then(response => {
          console.log('Email sent successfully:', response);
          resolve(response);
        })
        .catch(error => {
          console.error('Error sending email:', error);
          reject(error);
        });
    });
  }
}
