import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }

  sendEmail(templateParams: any):Promise<EmailJSResponseStatus>{
    return emailjs.send(
      'service_ffjl9zm',
      'template_4e4j4ij',
      templateParams,
      '46iTsitmzR0lPDzbv'
    )
  }
}
