/*
 *
 * CourseList
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import { blue500, yellow600, orange500, red500, green500, purple500 } from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import makeSelectCourseList from './selectors';
const style = {
  margin: 50,
};

export class CourseList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="CourseList"
          meta={[
            { name: 'description', content: 'Description of CourseList' },
          ]}
        />
        <List>
          <ListItem
            leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
            rightIcon={<ActionInfo />}
            primaryText="414"
            secondaryText="Jan 20, 2014"
          />
          <ListItem
            leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={yellow600} />}
            rightIcon={<ActionInfo />}
            primaryText="411"
            secondaryText="Jan 20, 2014"
          />
          <ListItem
            leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={orange500} />}
            rightIcon={<ActionInfo />}
            primaryText="306"
            secondaryText="Jan 20, 2014"
          />
          <ListItem
            leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={green500} />}
            rightIcon={<ActionInfo />}
            primaryText="410"
            secondaryText="Jan 20, 2014"
          />
          <ListItem
            leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={red500} />}
            rightIcon={<ActionInfo />}
            primaryText="203"
            secondaryText="Jan 20, 2014"
          />
          <ListItem
            leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={purple500} />}
            rightIcon={<ActionInfo />}
            primaryText="307"
            secondaryText="Jan 20, 2014"
          />
          <FloatingActionButton style={style}>
            <ContentAdd />
          </FloatingActionButton>
        </List>

      </div>
    );
  }
}

CourseList.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  CourseList: makeSelectCourseList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
