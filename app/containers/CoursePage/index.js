/*
 *
 * CoursePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { TextField } from 'material-ui';
import { List, ListItem } from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import { blue500 } from 'material-ui/styles/colors';
import makeSelectCoursePage from './selectors';
import { selectClasses } from '../CourseList/selectors';

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
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
};
export class CoursePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
      currentCourse: {},
    };
  }
  state = {
    open: false,
    checked: false,
  };

  componentWillMount() {
    const classes = this.props.Classes.toJS();
    const currentCourse = classes.find((course) => (course.id === this.props.params.courseId));

    this.setState({
      currentCourse,
    });
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleNestedListToggle = (item) => {
    this.setState({
      open: item.state.open,
    });
  };

  handleChange = (value) => {
    this.setState({
      value,
    });
  };

  render() {
    return (
      <div>
        <h2 style={styles.headline}>{this.state.currentCourse.name}</h2>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
        >
          <Tab label="Make Questions" value="b">
            <div>
              <h2 style={styles.headline}>Create and post your question</h2>
              <List>
                <Subheader>Nested List Items</Subheader>
                <ListItem key={89}>
                  <TextField
                    hintText="Make a question"
                    errorText="This field is required."
                    floatingLabelText="Make a questionl"
                    rows={1}
                    key={0}
                    multiLine
                    fullWidth
                    style={style}
                    id="question"
                  />
                </ListItem>
                <ListItem
                  key={786}
                  primaryText="Answers"
                  nestedItems={[
                    <ListItem key={43}>
                      <TextField
                        key={1}
                        hintText="Make a question"
                        floatingLabelText="Make a question"
                        rows={2}
                        multiLine
                        fullWidth
                        style={style}
                        id="Answers"
                      />
                    </ListItem>,
                    <ListItem key={123}>
                      <TextField
                        hintText="Make a question"
                        floatingLabelText="Make a question"
                        key={2}
                        rows={3}
                        fullWidth
                        multiLine
                        style={style}
                        id="Answers"
                      />
                    </ListItem>,
                    <ListItem key={432}>
                      <TextField
                        hintText="Make a question"
                        floatingLabelText="Make a questionl"
                        rows={4}
                        key={3}
                        multiLine
                        fullWidth
                        style={style}
                        id="Answers"
                      />
                    </ListItem>,
                    <ListItem key={4}>
                      <RaisedButton label="Add Question" style={style} />
                    </ListItem>,
                  ]}
                />
              </List>
              <RaisedButton label="Post Questions" style={style} />
            </div>
          </Tab>
          <Tab label="Questions Status" value="c">
            <div>
              <Toggle
                toggled={this.state.open}
                onToggle={this.handleToggle}
                labelPosition="right"
                label="This toggle controls the expanded state of the submenu item."
              />
              <br />

              <List>
                <Subheader>Nested List Items</Subheader>
                <ListItem key={100} primaryText="Unanswered" leftIcon={<ContentSend />} />
                <ListItem
                  key={90}
                  primaryText="Answered"
                  leftIcon={<ContentInbox />}
                  initiallyOpen
                  primaryTogglesNestedList
                  nestedItems={[
                    <ListItem
                      key={5}
                      primaryText="Question 1"
                    />,
                    <ListItem
                      key={6}
                      primaryText="Question 2"
                    />,
                    <ListItem
                      key={7}
                      primaryText="Question 3"
                      open={this.state.open}
                      onNestedListToggle={this.handleNestedListToggle}
                    />,
                  ]}
                />
              </List>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

CoursePage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  Classes: PropTypes.any,
  params: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  CoursePage: makeSelectCoursePage(),
  Classes: selectClasses(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
