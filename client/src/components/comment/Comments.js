import React, { Component, Fragment } from 'react'
import CommentItem from './CommentItem';
import { Link } from "react-router-dom";

class Comments extends Component {

       
  render() {
    const {postId} = this.props;
    
    let filterComments =  this.props.comments.filter(
                            (comment, index) => index <=2)  
   
    let threeComments;
    if(this.props.comments) {
     threeComments = filterComments.map(comment => (
        <CommentItem key={comment._id} comment={comment} postId={this.props.postId}
         showAvatar={this.props.showAvatar}
          showDelete={this.props.showDelete} />
      ));
     }
    return (
      <div>
          {this.props.comments.length > 3 &&  (<Link
          to={`/showPost/${postId}`}
         style={{ color: "gray", marginLeft: "25px" }}>

          <Fragment>View all {this.props.comments.length} comments</Fragment>
        </Link>)}
        {threeComments}
      </div>
    );
  }
}

export default Comments;
    