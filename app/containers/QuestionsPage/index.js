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
import styled from 'styled-components';
import { RaisedButton } from 'material-ui';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import makeSelectQuestionsPage from './selectors';
import messages from './messages';
import myImage from '../../img/background1.png';


const Title = styled.div`

  margin:0px;
  padding:0px;
 background-image: url(${myImage});
 background-size:cover;
font-weight:300;
 height:1000px;
`;
const Title2 = styled.div`
  position: relative;

z-index: 1;
background: #FFFFFF;
max-width: 800px;
margin-top:  30;
margin: 0 auto 100px;
padding: 2%;
`;

export class QuestionsPage extends React.Component {
  state = {
    value: null,
  };

  handleChange = (event, index, value) => this.setState({ value });// eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Title>
          <Helmet
            title="QuestionsPage"
            meta={[
            { name: 'description', content: 'Description of QuestionsPage' },
            ]}
          />
          <Title2>

            <h1>
              <FormattedMessage {...messages.header1} />
            </h1>
            <SelectField value={this.state.value} autoWidth onChange={this.handleChange}>
              <MenuItem value={1} label="5 am - 12 pm" primaryText="Morning" />
              <MenuItem value={2} label="12 pm - 5 pm" primaryText="This is to test if the autowidth works" />
              <MenuItem value={3} label="5 pm - 9 pm" primaryText="Evening" />
              <MenuItem value={4} label="9 pm - 5 am" primaryText="Night" />
            </SelectField>
            <RaisedButton label="Subscribe" primary type="submit" />
          </Title2>
        </Title>
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
