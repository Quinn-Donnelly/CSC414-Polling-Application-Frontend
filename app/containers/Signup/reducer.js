/*
 *
 * Signup reducer
 *
 */

 import { fromJS } from 'immutable';
 import {
   DEFAULT_ACTION,
   SIGN_UP,
 } from './constants';

 const initialState = fromJS({
   user: {},
 });

 function loginReducer(state = initialState, action) {
   switch (action.type) {
     case DEFAULT_ACTION:
       return state;
     case SIGN_UP:
       return state
         .set('user', action.payload);
     default:
       return state;
   }
 }

 export default loginReducer;
