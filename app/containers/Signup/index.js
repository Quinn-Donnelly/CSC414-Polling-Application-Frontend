/*
 *
 * Signup
 *
 */
 import React, { PropTypes } from 'react';
 import { connect } from 'react-redux';
 import Helmet from 'react-helmet';
 import styled from 'styled-components';

 import { createStructuredSelector } from 'reselect';
 import { TextField, RaisedButton } from 'material-ui';

 import makeSelectSignup from './selectors';
 import {
   signUp,
 } from './actions';
 import myImage from '../../img/background1.png';
 import myImage2 from '../../img/pollerName.png';

 const style = {
   fontSize: '24px',
   textAlign: 'center',
   display: 'block',
   margin: 'auto',
   width: '50%',

 };
 const Title = styled.h1`
   margin:0px;
   padding:100px 0px 0px 0px;
 font-weight:30;
 background-image: url(${myImage});
 background-size:cover;
  height:1200px;
   `;

 const Title2 = styled.div`
   position: relative;
 z-index: 1;
 background: #FFFFFF;
 max-width: 800px;
 margin-top:  30;
 margin: 0 auto 100px;
 padding: 2%;
 text-align: center;
 `;
 const Title3 = styled.div`
 font-family: "Roboto", sans-serif;
  outline: ;
  background: #f2f2f2;
  width: 100%;
  border: ;
  margin: 0 auto 40px;
  padding: 5px;
  box-sizing: border-box;
  font-size: 14px;
  `;

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
         <Title>
           <Title2>
             <img src={myImage2} height="35%" width="35%" alt="Poller Name Logo" />
             <h5>SIGN UP</h5>
             <form onSubmit={(evt) => this.props.sign(evt)}>
               <Title3>
                 <TextField
                   hintText="Username"
                   errorText="This field is required."
                   floatingLabelText="Enter Username"
                   rows={1}
                   style={style}
                   id="username"
                 /><br />
               </Title3>
               <Title3>

                 <TextField
                   hintText="Email"
                   errorText="This field is required."
                   floatingLabelText="Enter Email"
                   rows={2}
                   style={style}
                   id="email"
                 /><br />
               </Title3>
               <Title3>


                 <TextField
                   hintText="Password"
                   errorText="This field is required."
                   floatingLabelText="Password"
                   type="password"
                   style={style}
                   id="pwd"
                 /><br />
               </Title3>
               <Title3>
                 <TextField
                   hintText="Confirm Password"
                   errorText="This field is required."
                   floatingLabelText="Confirm Password"
                   type="password"
                   style={style}
                   id="pwd2"
                 /><br />
               </Title3>


               <RaisedButton label="Subscribe" primary style={style} type="submit" />
             </form>
           </Title2>
         </Title>


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
       const pwd2 = document.getElementById('pwd2').value;
       const email = document.getElementById('email').value;
       const username = document.getElementById('username').value;
       if (pwd === pwd2) {
         if (pwd !== '' && email !== '' && username !== '') {
           dispatch(signUp(email, pwd, username));
         }
       }
     },
   };
 }

 export default connect(mapStateToProps, mapDispatchToProps)(Signup);
