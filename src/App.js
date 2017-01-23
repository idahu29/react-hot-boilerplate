import React, { Component } from 'react';
import CommentField,{CommentForm} from './comments';
import Svg1 from './d3-1';
export default class Demo extends Component {
  displayName:'Demo'
  render() {
    const data = [{author: 'biao3', text: 'test3'}, {author:'biao4', text: 'test4', markdown: true}]
    return (
      <div className="commentBox">
        <h1>CommenT23423123</h1>
        <CommentForm />
        <CommentField data= {data}  />
      </div>
      // <div className="Demo">
      //       <h1>d3 1</h1>
      //       <Svg1 />
      // </div>
    );
  }
}

