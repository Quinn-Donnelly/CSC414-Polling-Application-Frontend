/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import { FormattedMessage } from 'react-intl';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import { blue500 } from 'material-ui/styles/colors';
import CourseList from '../CourseList';
import { getClasses } from '../CourseList/actions';

import myImage from '../../img/pollerbear2.png';
import messages from './messages';


const style = {
  fontSize: '24px',
  textAlign: 'center',
  display: 'block',
  margin: 'auto',
  width: '50%',


};
const Title = styled.div`

  margin:0px;
  padding:200px 0px 0px 0px;
  background-image: url(${myImage});
  background-size:cover;
 height:1200px;

  `;

const Title2 = styled.div`
position: relative;
 margin-top:  30;
z-index: 1;
background: #FFFFFF;
max-width: 800px;
margin: 0 auto 200px;
padding: 3%;

text-align: center;
`;
const Title3 = styled.h3`
font-family: "Roboto", sans-serif;
 outline: 0;
 background: #f2f2f2;
 width: 100%;
 border: 0;
 margin: 0 0 15px;
 padding: 15px ;
 box-sizing: border-box;
 font-size: 14px;
 `;
const Title1 = styled.div`
 font-family: "Roboto", sans-serif;
 position: relative;
  margin-top:  1;
 z-index: 1;
 background: #f2f2f2FF;
 max-width: 400px;
 margin: 0 auto 10px;
 padding: 0;
 font-size: 20px;

 text-align: center;
 `;

export default class NotFound extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (


      <div className="wrapper">





        <Title>
            <Title1>

          </Title1>
          <Title2>

            <img src={myImage} height = '35%' width = '35%' />

            <h1>This is not the page your looking for.</h1>
          </Title2>
        </Title>

      </div>

    );
  }
}
