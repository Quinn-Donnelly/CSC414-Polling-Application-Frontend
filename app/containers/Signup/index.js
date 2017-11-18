/*
 *
 * Signup
 *
 */
 import React, { PropTypes } from 'react';
 import { connect } from 'react-redux';
 import Helmet from 'react-helmet';

 import { createStructuredSelector } from 'reselect';
 import { TextField, RaisedButton } from 'material-ui';

 import makeSelectSignup from './selectors';
 import {
   signUp,
 } from './actions';

 const style = {
   fontSize: '24px',
   textAlign: 'center',
   display: 'block',
   margin: 'auto',
   width: '50%',


 };

 export class Signup extends React.Component { // eslint-disable-line react/prefer-stateless-function
   render() {
     return (
       <div>
         <Helmet
           title="Signup"
           meta={[
             { name: 'description', content: 'Description of Signup' },
           ]}
         />
         <form onSubmit={(evt) => this.props.sign(evt)}>
           <TextField
             hintText="Username"
             errorText="This field is required."
             floatingLabelText="Enter Username"
             rows={1}
             style={style}
             id="username"
           /><br />
           <TextField
             hintText="Email"
             errorText="This field is required."
             floatingLabelText="Enter Email"
             rows={2}
             style={style}
             id="email"
           /><br />
           <TextField
             hintText="Password"
             errorText="This field is required."
             floatingLabelText="Password"
             type="password"
             style={style}
             id="pwd"
           /><br />

           <RaisedButton label="Subscribe" primary style={style} type="submit" />
         </form>
       </div>
     );
   }
}

 Signup.propTypes = {
   sign: PropTypes.func.isRequired,
 };

 const mapStateToProps = createStructuredSelector({
   Signup: makeSelectSignup(),
 });
 function mapDispatchToProps(dispatch) {
   return {
     dispatch,
     sign: (evt) => {
       evt.preventDefault();
       const pwd = document.getElementById('pwd').value;
       const email = document.getElementById('email').value;
       const username = document.getElementById('username').value;
       if (pwd !== '' && email !== '' && username !== '') {
         dispatch(signUp(email, pwd, username));
       }
     },
   };
 }

 export default connect(mapStateToProps, mapDispatchToProps)(Signup);
