/*
 *
 * CourseList
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { TextField } from 'material-ui';
import { createStructuredSelector } from 'reselect';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import { List, ListItem } from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import { blue500, yellow600 } from 'material-ui/styles/colors';
import makeSelectCourseList from './selectors';


const styles = {
  errorStyle: {
    color: blue500,
  },
};

export class CourseList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleTouchTap = (event) => {
   // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };// eslint-disable-line react/prefer-stateless-function
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
        </List>
        <RaisedButton
          onClick={this.handleTouchTap}
          primary
          label="Add Class"
        />

        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <TextField
              hintText=" Course Name"
              hintStyle={styles.errorStyle}
            />
          </Menu>
          <Toggle
            label=" Secure"
            style={styles.toggle}
          />
        </Popover>

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
