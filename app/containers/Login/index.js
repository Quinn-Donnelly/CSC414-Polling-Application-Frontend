/*
 *
 * Login
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { TextField, RaisedButton } from 'material-ui';
import makeSelectLogin from './selectors';
import {
  logIn,
} from './actions';

const style = {
  fontSize: '24px',
  textAlign: 'center',
  display: 'block',
  margin: 'auto',
  width: '50%',


};
const Title = styled.h1`

  margin:0px;
  padding:0px;
  background: -webkit-linear-gradient(left, #25c481, #25b7c4);
 background: linear-gradient(to right,#ff0055, #2cc7c4);
font-weight:300;
 height:1000px;

  `;

const Title2 = styled.h2`
position: relative;
z-index: 1;
background: #FFFFFF;
max-width: 800px;
margin: 0 auto 200px;
padding: 6%;

text-align: center;
`;
const Title3 = styled.h3`
font-family: "Roboto", sans-serif;
 outline: 0;
 background: #f2f2f2;
 width: 100%;
 border: 0;
 margin: 0 0 15px;
 padding: 15px ;
 box-sizing: border-box;
 font-size: 14px;
 `;
/*
 *  To add the communications to the server do the following
 *  1. Create a constant that will be the name of whatever action you at doing in ./constants
 *  2. Create a action that makes a javascript object with a type key that has a
 *     value of the action you created
 *  3. Use the dispatch prop in the Component to dispatch the action that you created
 *  4. In the sagas file add a watcher that yields to a takeEvery or takeLatest
 *     depending on your needs it watches for the constant you created
 *  5. Have the watcher call a function generator that makes the request using the request module in utils
 *  6. Store the data if needed and any errors that occur to show to the user

 */

export class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (


      <div className="wrapper">

        <Helmet
          title="Login"
          meta={[
            { name: 'description', content: 'Description of Login' },
          ]}
        />
        <Title>
          <Title2>
            <form onSubmit={(evt) => this.props.login(evt)}>
              <Title3>
                <TextField
                  hintText="Email"
                  errorText="This field is required."
                  floatingLabelText="Enter Email"
                  rows={1}
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

              <RaisedButton label="Sign In" style={style} primary type="submit" />
              <RaisedButton label="Sign UP" style={style} secondary onClick={() => this.props.dispatch(push('/signup'))} />
            </form>
          </Title2>
        </Title>

      </div>

    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    login: (evt) => {
      evt.preventDefault();
      const pwd = document.getElementById('pwd').value;
      const email = document.getElementById('email').value;
      if (pwd !== '' && email !== '') {
        dispatch(logIn(email, pwd));
      }
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
