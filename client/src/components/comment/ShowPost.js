import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Moment from "react-moment"; 
import Spinner from "../common/Spinner";
import AddComment from './AddComment';
import { likePost,unlikePost,deletePost, getPost } from '../../actions/PostActions';
import AllComments from './AllComments';

class ShowPost extends Component {
   constructor(props) {
    super(props);
 
  }

  componentDidMount() {
    console.log('this.props.match.params.id'+this.props.match.params.id);
    this.props.getPost(this.props.match.params.id);
  }

  goBack() {
    this.props.history.goBack();
  }
  onDeletePost(postId) {
    this.props.deletePost(postId);
  }

  render() {
    const {post, loadingPost} = this.props.posts;
   
    const postId = this.props.match.params.id;
    
    let content;
    if (loadingPost || post === null) {
      content = <Spinner />
    } 
    if (post && post.user) {
      let deleteIcon;
    let isLiked = false;
    if(post.likes !== undefined) {
    if(post.likes.filter(like => like.user === this.props.auth.user.id).length > 0)
    {
      isLiked = true;
    }
   }
  
 
     if (post.user === this.props.auth.user.id) {
       console.log('inside delete incon');
       deleteIcon = (
         <div
           type='button'
           className='delete-post'
           onClick={this.onDeletePost.bind(this, post._id)}
         >
           <i
             className='fa fa-trash'
             aria-hidden='true'
           ></i>
         </div>
       );
     }
    const icons = (
      <div>
        {isLiked === true ? (
          <div type='button' className='icons-post'>
            <i
              onClick={() => {
                this.props.unlikePost(post._id);
              }}
              className='fa fa-heart'
              style={{ fontSize: "1.5em", color: "red" }}
              aria-hidden='true'
            ></i>
          </div>
        ) : (
          <div
            type='button'
            onClick={() => this.props.likePost(post._id)}
            className='icons-post'
          >
            <i className='fa fa-heart-o'
              style={{ fontSize: "1.5em", color: "black" }}
              aria-hidden='true'
            ></i>
          </div>
        )}
        {deleteIcon}
      </div>
    );
      content = (
        <div className='post-wrapper'>
          

          <div className='container-post'>
            <img
              className='post-image'
              src={post.image}
            />
            <div className='comment-content d-none d-xl-block d-md-none d-lg-none d-sm-none '>
               <Link to={`/profile/${post.handle}`}>
                  <img className='user-avatar rounded-circle' src={post.user.avatar} />
                </Link>
              <Link to={`/profile/${post.handle}`} className='handle-post'>
                {post.handle}
              </Link>
              <hr style={{ marginBottom: "10px" }} />
              <div>
             
                
                 
                    <div  className='postTitle-comment-div'>
                     
                      <span className='postTitle-comment'>
                         {post.text}
                      </span>
                    </div>
                 
                
              </div>

              <div className='comments-div'>
               
                  <AllComments comments={post.comments} postId={postId} />
               
              </div>
                  
              
              <div id='footer'>
                <hr />
                <section>
                  {icons}
                </section>
                <div className='post-date'>
                  <div
                    style={{
                      fontWeight: "600",
                      fontSize: "1.4em",
                      color: "black",
                    }}
                  >
                    {post.likes && post.likes.length} Likes
                  </div>
                  <Moment format="D MMM YYYY">{post.date}</Moment>
                </div>
                <hr />
                <AddComment postId={postId}/>
                
              </div>
            </div>
          </div>
        </div>
    
           
      );
    }
  
    return (
      <div className='comment-main-div'>
        {content}
      </div>
    );
  }
}


const mapStateToProps = state => ({
  posts: state.posts,
  auth: state.auth
});

export default connect(mapStateToProps, { getPost, deletePost, likePost, unlikePost})(ShowPost);

