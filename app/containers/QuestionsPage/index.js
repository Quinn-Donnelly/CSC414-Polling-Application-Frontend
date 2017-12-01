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
import { getQuestions, answerQuestion } from './actions';


const Title = styled.div`

  margin-top: -15px;

 background-image: url(${myImage});
 background-size:cover;
font-size: 10
 height:1200px;
`;
const Title2 = styled.div`
background: #FFFFFF;
font-size: 10px;
margin-top:  10;
margin: 0 auto 10px;
padding: 2%;
overflow-wrap: break-word;
`;

const Title3 = styled.div`
background: #FFFFFF;
font-size: 10px;


`;

export class QuestionsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.props.answer.bind(this);
  }

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
          </Title2>
            <Title3>
          <SelectField value={this.state.value[i]} fullWidth id={i.toString()} onChange={this.handleChange.bind(this, i)}>
            <MenuItem value={0} label={this.props.QuestionsPage.questions[i].type.options[0]} name="joe" primaryText={this.props.QuestionsPage.questions[i].type.options[0]} />
            <MenuItem value={1} label={this.props.QuestionsPage.questions[i].type.options[1]} name="blow" primaryText={this.props.QuestionsPage.questions[i].type.options[1]} />
            <MenuItem value={2} label={this.props.QuestionsPage.questions[i].type.options[2]} name="hey" primaryText={this.props.QuestionsPage.questions[i].type.options[2]} />

          </SelectField>
            </Title3>
          <RaisedButton label="submit" primary type="submit" onClick={(evt) => { evt.preventDefault(); this.props.answer(i, this.state.value[i]); }} />
        </ListItem>
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
  answer: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  QuestionsPage: makeSelectQuestionsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchQuestions: () => dispatch(getQuestions()),
    answer: (id, selection) => {
      dispatch(answerQuestion(id, selection));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsPage);
