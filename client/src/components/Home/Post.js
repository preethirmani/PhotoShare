import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { likePost,unlikePost,deletePost } from '../../actions/PostActions';
import "../../css/home.css";

class Post extends Component {

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

  render() {
    const { post, auth } = this.props;
    return (
      
                  <div className= "card card-posts">
                    <h6 className= "card-title ">{post.handle}</h6>
                    <img className= "card-img-top img-posts-home" src={post.image} alt="Card image cap"/>
                    <div className= "card-body">
                      
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
                              <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                                Comments
                              </Link>
                              {post.user === auth.user.id ? (
                                <button
                                  onClick={this.onDeleteClick.bind(this, post._id)}
                                  type="button"
                                  className="btn btn-danger mr-1"
                                >
                                  <i className="fas fa-times" />
                                </button>
                              ) : null}
                            </span>
                            <p className= "card-text">{post.text}</p>
                      <form>
                        <textarea  name="comment" className="home-comment"/>
                      </form>
                    </div>
                  </div>

    
    )
  
  }
}

Post.propTypes = {
  likePost : PropTypes.func.isRequired,
  unlikePost : PropTypes.func.isRequired,
  deletePost : PropTypes.func.isRequired,
  post : PropTypes.object.isRequired,
  auth : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps,{likePost, unlikePost, deletePost}) (Post);
