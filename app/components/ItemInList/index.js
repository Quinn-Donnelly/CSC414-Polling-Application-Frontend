/**
*
* ItemInList
*
*/

import React, { PropTypes } from 'react';
// import styled from 'styled-components';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import { blue500 } from 'material-ui/styles/colors';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
const styles = {
  fontSize: '24px',
  textAlign: 'center',
  display: 'block',
  margin: 'auto',
  width: '50%',
};
class ItemInList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="ListItem">
      styles={styles}
        <ListItem
          leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
          rightIcon={<ActionInfo />}
          primaryText={this.props.text}
          secondaryText={this.props.subText}
          onClick={this.props.onClick}
        />
      </div>
    );
  }
}

ItemInList.propTypes = {
  text: PropTypes.string.isRequired,
  subText: PropTypes.string,
  onClick: PropTypes.func,
};

export default ItemInList;
