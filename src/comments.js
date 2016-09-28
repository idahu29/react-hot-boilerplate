/**
 * Created by biao on 7/9/2016.
 */
import React, { Component } from 'react';
import Remarkable from 'remarkable';

export class CommentForm extends Component {
    render (){
        return (React.createElement('h1', null, "Hi,I'm a CommentForm" ))
    }
}

export default class CommentList extends Component {
    render (){
        const md = new Remarkable({html: true});
        let commentList = this.props.data.map(function(comment){
            return (<Comment author={comment.author}>{comment.markdown?md.render(comment.text):comment.text}</Comment>)
        })
        return (
            <div class="CommentField">
                {commentList}
                <Comment author="biao" children="testtest"/>
                <Comment author="biao2">I'm a <strong>children2123</strong> </Comment>
                <Comment author="biao2">{md.render("I'm a <strong>RemarkDown TEST123123</strong>")} </Comment>
            </div>
        )
    }
}

export class Comment extends Component {
    render (){
        return (
            <div className="comment">
                <h2 className="author">{this.props.author}</h2>
                {this.props.children}
            </div>
        )
    }
}