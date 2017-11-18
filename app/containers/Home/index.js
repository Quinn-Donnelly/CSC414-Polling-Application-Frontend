/*
 *
 * Home
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import { blue500 } from 'material-ui/styles/colors';
import makeSelectHome from './selectors';
import CourseList from '../CourseList';
import { getClasses } from '../CourseList/actions';

const style = {
  margin: 12,
};


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  errorStyle: {
    color: blue500,
  },
};
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
            <h2 style={styles.headline}>Select to go to your course list </h2>
            <RaisedButton
              label="Course List"
              primary
              onClick={() => this.fetchClasses()}
            />
            <CourseList />
          </div>
        </Tab>
        <Tab label="Join" value="b">
          <div>
            <h2 style={styles.headline}>Enter in code to join</h2>
            <TextField
              hintText="course code"
              hintStyle={styles.errorStyle}
            />
            <RaisedButton label="Join" primary style={style} />
          </div>
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
