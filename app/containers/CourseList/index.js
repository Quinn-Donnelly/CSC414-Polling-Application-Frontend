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
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import Menu from 'material-ui/Menu';
import { List } from 'material-ui/List';
import { blue500 } from 'material-ui/styles/colors';
import makeSelectCourseList from './selectors';
import { getClasses, addClass } from './actions';
import ItemInList from '../../components/ItemInList';


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
      toggled: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(getClasses());
  }

  submitNewCourse(evt) {
    evt.preventDefault();
    const secure = document.getElementById('newCourseIsSecure');
    const name = document.getElementById('newCourseName');

    this.props.dispatch(addClass(name.value, secure.value));
    name.value = '';
  }

  handleTouchTap = (event) => {
   // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  handleToggle(evt) {
    this.setState({
      toggled: evt.target.value,
    });
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  render() {
    const courses = this.props.CourseList.classes;

    const items = [];

    for (let i = 0; i < courses.length; i += 1) {
      if (courses[i].secure) {
        items.push(
          <ItemInList
            key={i}
            text={courses[i].name}
            subText="secure"
          />
        );
      } else {
        items.push(<ItemInList key={i} text={courses[i].name} />);
      }
    }
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        onClick={this.handleClose}
      />,
    ];
    return (
      <div>
        <Helmet
          title="CourseList"
          meta={[
            { name: 'description', content: 'Description of CourseList' },
          ]}
        />
        <List>
          {items}
        </List>
        <RaisedButton
          onClick={this.handleOpen}
          primary
          label="Add Class"
        />
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal
          open={this.state.open}
        >
          <form onSubmit={(evt) => this.submitNewCourse(evt)}>
            <Menu>
              <TextField
                hintText=" Course Name"
                hintStyle={styles.errorStyle}
                id="newCourseName"
                name="name"
              />
            </Menu>
            <Toggle
              label=" Secure"
              style={styles.toggle}
              name="secure"
              id="newCourseIsSecure"
            />
          </form>
         Only actions can close this dialog.
       </Dialog>

      </div>
    );
  }
}

CourseList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  CourseList: PropTypes.shape({
    classes: PropTypes.array,
  }),
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
