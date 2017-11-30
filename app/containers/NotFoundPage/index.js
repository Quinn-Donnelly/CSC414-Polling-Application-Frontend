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


import React from 'react';
import styled from 'styled-components';
import myImage from '../../img/pollerbear2.png';


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


export default class NotFound extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (


      <div className="wrapper">


        <Title>
          <Title2>

            <img src={myImage} height="35%" width="35%" alt="poler bear logo" />

            <h1>This is not the page your looking for.</h1>
          </Title2>
        </Title>

      </div>

    );
  }
}
