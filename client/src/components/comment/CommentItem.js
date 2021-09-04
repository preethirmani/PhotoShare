import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/PostActions';
import '../../css/comments.css';


 class CommentItem extends Component {

   deleteComment(postId, commentId) {
    this.props.deleteComment(postId, commentId);
   }

   render() {
    const {comment, auth, postId} = this.props;
    let deleteIcon;
 

   
    console.log('comment.user'+comment.user);
    console.log('auth.user.id'+auth.user.id);
    if (comment._id === auth.user.id)  {
      deleteIcon = (
        <div type="button" className='col-lg-2' onClick={this.deleteComment.bind(this, postId, comment._id)}>
          <div className='delete-post'>
            <i
              style={{
                fontSize: "0.9em",
                float: "right",
                padding: "5px",
                marginTop: "15px",
                fontWeight: "lighter",
              }}
              className='fa fa-trash'
              aria-hidden='true'
            ></i>
          </div>
        </div>
      );
    }
    
    return (
    
        <div class='row'>
          <div >
            <div>
              <Link
                to={`/profile/${comment.handle}`}
                className='comment-handle'
              >
                {comment.handle}
              </Link>
              <span>&nbsp; {comment.text}</span>
            </div>
          </div>
        </div>
     
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect (mapStateToProps,{deleteComment}) (CommentItem);