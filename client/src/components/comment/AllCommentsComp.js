import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/PostActions';

class AllCommentsComp extends Component {


  deleteComment(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }


  render() {
    const {comment, auth, postId} = this.props;
    let deleteIcon;
  
 
    

    if (comment.user === auth.user.id)  {
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

        <section className='row'>      
      
        <div className={`${comment.user._id === auth.user.id ? "col-lg-8" : "col-lg-10"}`}>
          <div id='col-space'>
            <Link to={`/profile/${comment.handle}`} className='handle-all-comment'>
              {comment.handle}
            </Link>
            <span className='textStyle-comment'>
              &nbsp; {comment.text}
            </span>
          </div>
        </div>
        {deleteIcon}
      </section>
     
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {deleteComment})(AllCommentsComp);

