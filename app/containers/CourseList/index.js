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
import { List } from 'material-ui/List';
import { blue500 } from 'material-ui/styles/colors';
import makeSelectCourseList from './selectors';
import { getClasses } from './actions';
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
    };
  }

  componentDidMount() {
    this.props.dispatch(getClasses());
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

  render() {
    console.log('rendered', this.props);
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
