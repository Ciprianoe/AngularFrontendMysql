import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider,sendPasswordResetEmail,sendEmailVerification, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private auth:Auth) { }


register({email,password}:any ){
  return createUserWithEmailAndPassword(this.auth,email,password)
}

loginUser({email,password}:any){
  return signInWithEmailAndPassword(this.auth,email,password)
}


logOutUser(){
  return signOut(this.auth);
}

logInGoogle(){
  return signInWithPopup(this.auth, new GoogleAuthProvider());
}

 recuperarService(email:any){

  return sendPasswordResetEmail(this.auth,email);

 } 

 verificarEmail(user:User){
  return sendEmailVerification(user);
 }

}