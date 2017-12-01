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
import { RaisedButton, ListItem, Paper } from 'material-ui';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import makeSelectQuestionsPage from './selectors';
import messages from './messages';
import myImage from '../../img/background1.png';
import { getQuestions } from './actions';


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

export class QuestionsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    value: [],
  };

  componentWillMount() {
    this.props.fetchQuestions();
  }

  handleChange = (inputId, event, index, value) => {
    const arr = this.state.value;
    arr[inputId] = value;
    this.setState({ value: arr });
  }

  render() {
    let listOfQuestions = [];
/* eslint-disable */
    for (let i = 0; i < this.props.QuestionsPage.questions.length; i += 1) {
      listOfQuestions.push(<li key={i.toString()}>
        <ListItem><Title2>
          <h1>{this.props.QuestionsPage.questions[i].text}</h1>
          <SelectField value={this.state.value[i]} autoWidth id={i.toString()} onChange={this.handleChange.bind(this, i)}>
            <MenuItem value={0} label={this.props.QuestionsPage.questions[i].type.options[0]} name="joe" id={i.toString()} primaryText={this.props.QuestionsPage.questions[i].type.options[0]} />
            <MenuItem value={1} label={this.props.QuestionsPage.questions[i].type.options[1]} name="blow" id={i.toString()} primaryText={this.props.QuestionsPage.questions[i].type.options[1]} />
            <MenuItem value={2} label={this.props.QuestionsPage.questions[i].type.options[2]} name="hey" id={i.toString()} primaryText={this.props.QuestionsPage.questions[i].type.options[2]} />

          </SelectField>
          <RaisedButton label="submit" primary type="submit" />
        </Title2></ListItem>
      </li>);
    }
/* eslint-enable */

    if (listOfQuestions.length === 0) {
      listOfQuestions = (<div style={{ width: '50%', margin: '0 auto' }}>
        <Paper elevation={24}>
          <h1>
            <FormattedMessage {...messages.header1} />
          </h1>
        </Paper>
      </div>);
    }

    return (
      <div>
        <Title>
          <Helmet
            title="QuestionsPage"
            meta={[
            { name: 'description', content: 'Description of QuestionsPage' },
            ]}
          />
          <ul style={{ listStyleType: 'none' }}>
            {listOfQuestions}
          </ul>
        </Title>
      </div>
    );
  }
}

QuestionsPage.propTypes = {
//  dispatch: PropTypes.func.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  QuestionsPage: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  QuestionsPage: makeSelectQuestionsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchQuestions: () => dispatch(getQuestions()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsPage);
