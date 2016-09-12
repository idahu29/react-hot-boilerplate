import React, { Component } from 'react';
import CommentField,{CommentForm} from './comments';
export default class CommentBox extends Component {
  displayName:'CommentBox'
  render() {
    const data = [{author: 'biao3', text: 'test3'}, {author:'biao4', text: 'test4', markdown: true}]
    return (
      <div className="commentBox">
        <h1>CommenT23423123</h1>
        <CommentForm />
        <CommentField data={data} />
      </div>
    );
  }
}

