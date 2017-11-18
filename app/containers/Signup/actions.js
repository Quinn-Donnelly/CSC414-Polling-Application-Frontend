
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

 export function signUp(email, password, username) {
   return {
     type: SIGN_UP,
     email,
     password,
     username,
   };
 }
