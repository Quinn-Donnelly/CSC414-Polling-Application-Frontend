/*
 *
 * Home
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import { blue500 } from 'material-ui/styles/colors';
import makeSelectHome from './selectors';
import CourseList from '../CourseList';
import { getClasses } from '../CourseList/actions';
import myImage from '../../background1.png';

const style = {
  margin: 12,
};


const styles = {
  headline: {
    fontSize: 35,
    marginTop: -30,
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
  background: -webkit-linear-gradient(left, #25c481, #25b7c4);
 background: linear-gradient(to right,#ff0055, #2cc7c4);
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
                  <TextField
                    hintText="course code"

                  />
                  <RaisedButton label="Join" secondary style={style} />
                </Title2>
              </Title1>

            </div>
          </Title>
        </Tab>
      </Tabs>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  Home: makeSelectHome(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
