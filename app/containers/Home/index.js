/*
 *
 * Home
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Tabs, Tab } from 'material-ui/Tabs';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import { blue500 } from 'material-ui/styles/colors';
import makeSelectHome from './selectors';
import { logOut } from '../Login/actions';
import { selectLoggedIn } from '../Login/selectors';
import CourseList from '../CourseList';
import { getClasses } from '../CourseList/actions';
import myImage from '../../img/background1.png';
import { joinClass } from './actions';

const style = {
  margin: 12,
};


const styles = {
  headline: {
    fontSize: 35,
    marginTop: -1,
    marginBottom: 12,
    fontWeight: 40,
  },
  errorStyle: {
    color: blue500,
  },
};
const Title = styled.div`

  margin:0px;
  padding:0px;
 background-image: url(${myImage});
 background-size:cover;
font-weight:300;
 height:1000px;
`;
const Title2 = styled.div`
   fontSize: 24px;
   text-align: center;
   display: block;
   margin: auto;
   width: 50%;
   `;
const Title1 = styled.div`
  fontSize: 24px;
  text-align: center;
  display: block;
  margin: auto;
  width: 50%;
  `;
const Title3 = styled.div`
color: #FFFFFF
  `;

export class Home extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
  }

  fetchClasses() {
    this.props.dispatch(getClasses());
  }

  handleChange = (value) => {
    this.setState({
      value,
    });
  };

  render() {
    return (
      <div>
        <AppBar
          title="Poller"
          iconElementLeft={<IconButton onClick={() => this.props.dispatch(goBack())}><ArrowBack /></IconButton>}
          iconElementRight={this.props.logged ? <FlatButton label="Log Out" onClick={() => this.props.exit()} /> : <FlatButton label="Login" />}
        />

        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
        >
          <Tab label="Course List" value="a">
            <div>
              <Title>


                <CourseList />
              </Title>
            </div>

          </Tab>
          <Tab label="Join" value="b">
            <Title>
              <div>

                <Title1>
                  <Title3>
                    <h2 style={styles.headline}>Enter in code to join</h2>
                  </Title3>
                  <Title2>
                    <form onSubmit={(evt) => { evt.preventDefault(); this.props.join(); }}>
                      <TextField
                        hintText="course code"
                        id="courseCode"
                      />
                      <RaisedButton label="Join" primary style={style} onClick={() => this.props.join()} />
                    </form>
                  </Title2>
                </Title1>

              </div>
            </Title>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  join: PropTypes.func.isRequired,
  exit: PropTypes.func.isRequired,
  logged: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  Home: makeSelectHome(),
  logged: selectLoggedIn(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    exit: () => dispatch(logOut()),
    join: () => {
      const shortId = document.getElementById('courseCode').value;
      dispatch(joinClass(shortId));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
