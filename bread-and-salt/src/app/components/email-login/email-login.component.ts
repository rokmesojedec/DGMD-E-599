import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-email-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './email-login.component.html',
  styleUrl: './email-login.component.scss'
})
export class EmailLoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor() {}

  async login() {
    try {
     // await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      console.log("Login successful!");
    } catch (err) {
  
    }
  }

  async signup() {
    try {
      //await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      console.log("Signup successful!");
    } catch (err) {
  
    }
  }
}
