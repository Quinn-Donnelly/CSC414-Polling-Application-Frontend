/*
 *
 * QuestionsPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import makeSelectQuestionsPage from './selectors';
import messages from './messages';

export class QuestionsPage extends React.Component {
  state = {
    value: null,
  };

  handleChange = (event, index, value) => this.setState({ value });// eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="QuestionsPage"
          meta={[
            { name: 'description', content: 'Description of QuestionsPage' },
          ]}
        />
        <h1>
          <FormattedMessage {...messages.header1} />
        </h1>
        <h1>
          <FormattedMessage {...messages.header1} />
        </h1>
        <SelectField value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={1} label="5 am - 12 pm" primaryText="Morning" />
          <MenuItem value={2} label="12 pm - 5 pm" primaryText="Afternoon" />
          <MenuItem value={3} label="5 pm - 9 pm" primaryText="Evening" />
          <MenuItem value={4} label="9 pm - 5 am" primaryText="Night" />
        </SelectField>
        <h1>
          <FormattedMessage {...messages.header2} />
        </h1>
        <SelectField value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={1} label="5 am - 12 pm" primaryText="Morning" />
          <MenuItem value={2} label="12 pm - 5 pm" primaryText="Afternoon" />
          <MenuItem value={3} label="5 pm - 9 pm" primaryText="Evening" />
          <MenuItem value={4} label="9 pm - 5 am" primaryText="Night" />
        </SelectField>
        <h1>
          <FormattedMessage {...messages.header3} />
        </h1>
        <SelectField value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={1} label="5 am - 12 pm" primaryText="Morning" />
          <MenuItem value={2} label="12 pm - 5 pm" primaryText="Afternoon" />
          <MenuItem value={3} label="5 pm - 9 pm" primaryText="Evening" />
          <MenuItem value={4} label="9 pm - 5 am" primaryText="Night" />
        </SelectField>
        <h1>
          <FormattedMessage {...messages.header4} />
        </h1>
        <SelectField value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={1} label="5 am - 12 pm" primaryText="Morning" />
          <MenuItem value={2} label="12 pm - 5 pm" primaryText="Afternoon" />
          <MenuItem value={3} label="5 pm - 9 pm" primaryText="Evening" />
          <MenuItem value={4} label="9 pm - 5 am" primaryText="Night" />
        </SelectField>
        <h1>
          <FormattedMessage {...messages.header5} />
        </h1>
        <SelectField value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={1} label="5 am - 12 pm" primaryText="Morning" />
          <MenuItem value={2} label="12 pm - 5 pm" primaryText="Afternoon" />
          <MenuItem value={3} label="5 pm - 9 pm" primaryText="Evening" />
          <MenuItem value={4} label="9 pm - 5 am" primaryText="Night" />
        </SelectField>
        <h1>
          <FormattedMessage {...messages.header6} />
        </h1>
        <SelectField value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={1} label="5 am - 12 pm" primaryText="Morning" />
          <MenuItem value={2} label="12 pm - 5 pm" primaryText="Afternoon" />
          <MenuItem value={3} label="5 pm - 9 pm" primaryText="Evening" />
          <MenuItem value={4} label="9 pm - 5 am" primaryText="Night" />
        </SelectField>

      </div>
    );
  }
}

QuestionsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  QuestionsPage: makeSelectQuestionsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsPage);
