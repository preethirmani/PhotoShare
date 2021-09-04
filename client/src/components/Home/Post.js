import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { likePost,unlikePost,deletePost, addComment } from '../../actions/PostActions';
import "../../css/home.css";
import AddComment from '../comment/AddComment';
import Moment from "react-moment";
import Comments from '../comment/Comments';


class Post extends Component {

  constructor() {
    super();
    this.state = {
     
      text: ''
    }
  }

  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.likePost(id);
  }

  onUnlikeClick(id) {
    this.props.unlikePost(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;

    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }



  render() {
    const { post, auth, showActions} = this.props;
    let likedbyList = post.likes.filter((like,index) => index === 0);
    let likedby = likedbyList.map(liked=> liked.handle);
    let comments = post.comments.filter(comment => comment.user !== null)
    
    
    return (
      
                  <div className= "card card-posts">
                    <div className="post-title">
                    <Link to={`/profilehanlde/${post.handle}`}>
                      <img
                      className='rounded-circle post-title-image'
                      src={auth.user.avatar}
                      alt='avatar'/>
                    </Link>

                    <Link className='post-title-Link' to={`/profilehanlde/${post.handle}`}>
                      <h6 className= "card-title post-title ">{post.handle}</h6>
                    </Link>
                     </div>
                    <img className= "card-img-top img-posts-home" src={post.image} alt="Card image cap"/>
                    
                      <div className= "card-body">
                       {showActions ? (
                      
                          <span>
                              <button
                                onClick={this.onLikeClick.bind(this, post._id)}
                                type="button"
                                className="btn btn-light mr-1"
                              >
                                <i
                                  className={classnames('fas fa-thumbs-up', {
                                    'text-info': this.findUserLike(post.likes)
                                  })}
                                />

                                  <span className="badge badge-light">{post.likes.length}</span>
                                  </button>
                                  <button
                                    onClick={this.onUnlikeClick.bind(this, post._id)}
                                    type="button"
                                    className="btn btn-light mr-1"
                                  >
                                    <i className="text-secondary fas fa-thumbs-down" />
                                  </button>
                                 
                                  {post.user === auth.user.id ? (
                                    <button
                                      onClick={this.onDeleteClick.bind(this, post._id)}
                                      type="button"
                                      className="btn btn-danger mr-1"
                                    >
                                      <i className="fa fa-trash" />
                                    </button>
                                  ) : null}
                                </span>
                            
                           ) : null}
                         <div className='div-likes-text'>
                       
                          {post.likes && 
                           <div>
                          Liked by &nbsp;
                          <Link className='post-handle' 
                          to={`/profilehanlde/${likedby}`}>{likedby}</Link> and others
                          </div> }
                        
                      </div>
                      
                        <div>
                          <Link className='post-handle'
                            to={`/profilehanlde/${post.handle}`} >
                            {post.handle}
                          </Link>
                          <span className='post-text'>
                            &nbsp; {post.text}
                          </span>
                        </div>
                        
                        <div >
                             <Comments
                      comments={comments}
                      postId={post._id}
                      showAvatar={true}
                      showDelete={true}
                    />
                   
                    <AddComment postId={post._id} />
                    </div>
                     
                      </div>
                    
                  </div>

    
    )
  
  }
}

Post.defaultProps = {
  showActions: true
};

Post.propTypes = {
  likePost : PropTypes.func.isRequired,
  unlikePost : PropTypes.func.isRequired,
  deletePost : PropTypes.func.isRequired,
  addComment : PropTypes.func.isRequired,
  post : PropTypes.object.isRequired,
  auth : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps,{likePost, unlikePost, deletePost, addComment}) (Post);
