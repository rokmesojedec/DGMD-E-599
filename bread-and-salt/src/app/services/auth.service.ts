import { Injectable, inject } from "@angular/core";
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, user } from "@angular/fire/auth";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private auth = inject(Auth);

  constructor() {}

  loginWithGoogle(): Promise<any> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }

  getUser(): Observable<any> {
    return user(this.auth);
  }
}