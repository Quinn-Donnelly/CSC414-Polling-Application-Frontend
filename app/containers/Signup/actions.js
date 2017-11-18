
 //* Signup actions
 import {
   DEFAULT_ACTION,
   SIGN_UP,
 } from './constants';

 export function defaultAction() {
   return {
     type: DEFAULT_ACTION,
   };
 }

 export function signUp(email, pass, username) {
   return {
     type: SIGN_UP,
     email,
     pwd: pass,
     username,
   };
 }

 // TODO: Currently going to store all login info from the api in plain text to the
 // reducer need to encrypt the token and use cookies with a fallback
