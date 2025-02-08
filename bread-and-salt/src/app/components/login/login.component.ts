import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, inject, signal } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { GoogleAuthProvider, FacebookAuthProvider, EmailAuthProvider, signOut, User, onAuthStateChanged } from 'firebase/auth';
import * as firebaseui from 'firebaseui';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewInit {
  private auth = inject(Auth);  // ✅ Use inject() to get initialized Firebase Auth
  private ui: firebaseui.auth.AuthUI | undefined;
  user = signal<User | null>(null);

  constructor() {

    // Listen for auth state changes
    onAuthStateChanged(this.auth, (user) => {
      this.user.set(user);
    });
  }

  ngAfterViewInit() {
    if (!this.user()) {
      this.initFirebaseUI();
    }
  }

  initFirebaseUI() {
    // Initialize FirebaseUI with correct auth instance
    if (!this.ui)
      this.ui = new firebaseui.auth.AuthUI(this.auth);

    const uiConfig = {
      signInFlow: 'popup',
      signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
        // FacebookAuthProvider.PROVIDER_ID,
        {
          provider: EmailAuthProvider.PROVIDER_ID,
          signInMethod: EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
        }
      ],
     // credentialHelper: firebaseui.auth.CredentialHelper.NONE, // Removes unnecessary credential prompts
      callbacks: {
        signInSuccessWithAuthResult: () => false
      }
    };
    this.ui.start('#firebaseui-auth-container', uiConfig);
  }

  logout() {
    signOut(this.auth).then(() => {
      this.user.set(null);
      console.log('User signed out');
      this.ui?.reset()
    });
  }
}
