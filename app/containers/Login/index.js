/*
 *
 * Login
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { createStructuredSelector } from 'reselect';
import { TextField, RaisedButton } from 'material-ui';

import makeSelectLogin from './selectors';


const style = {
  margin: 30,


};
export class Login extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="Login"
          meta={[
            { name: 'description', content: 'Description of Login' },
          ]}
        />

        <TextField
          hintText="UserName"
          errorText="This field is required."
          floatingLabelText="Enter UserName"
          rows={1}
          style={style}
        /> <br />
        <TextField
          hintText="Email"
          errorText="This field is required."
          floatingLabelText="Enter Email"
          rows={1}
          style={style}
        /><br />
        <TextField
          hintText="Password"
          errorText="This field is required."
          floatingLabelText="Password"
          type="password"
          style={style}
        /><br />


        <RaisedButton label="Sign In" style={style} />
        <RaisedButton label="Sign UP" style={style} />

      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
