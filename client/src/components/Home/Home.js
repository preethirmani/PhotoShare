import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { getAllPosts,likePost,unlikePost,deletePost,getSuggestions } from '../../actions/PostActions';
import spinner from '../common/Spinner';

import "../../css/home.css";

class Home extends Component {

  componentDidMount() {
    this.props.getAllPosts();
    this.props.getSuggestions();
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

  render() {

    const  postsList  = this.props.posts.posts;
    const { auth } = this.props;
    const { suggestions, loading } = this.props.posts;
    let homeContent;
    
    if(suggestions == null || postsList == null || loading) {
        homeContent = <spinner />
    } else {
      console.log('Suggestions length::'+suggestions.length);
      homeContent = 
        <div className='main-div-home'>
          {
            postsList.map(item => {
              return( 
                  <div className= "card card-posts">
                    <h6 className= "card-title ">{item.handle}</h6>
                    <img className= "card-img-top img-posts-home" src={item.image} alt="Card image cap"/>
                    <div className= "card-body">
                      
                      <span>
                          <button
                            onClick={this.onLikeClick.bind(this, item._id)}
                            type="button"
                            className="btn btn-light mr-1"
                          >
                            <i
                              className={classnames('fas fa-thumbs-up', {
                                'text-info': this.findUserLike(item.likes)
                              })}
                            />

                              <span className="badge badge-light">{item.likes.length}</span>
                              </button>
                              <button
                                onClick={this.onUnlikeClick.bind(this, item._id)}
                                type="button"
                                className="btn btn-light mr-1"
                              >
                                <i className="text-secondary fas fa-thumbs-down" />
                              </button>
                              <Link to={`/post/${item._id}`} className="btn btn-info mr-1">
                                Comments
                              </Link>
                              {item.user === auth.user.id ? (
                                <button
                                  onClick={this.onDeleteClick.bind(this, item._id)}
                                  type="button"
                                  className="btn btn-danger mr-1"
                                >
                                  <i className="fas fa-times" />
                                </button>
                              ) : null}
                            </span>
                            <p className= "card-text">{item.text}</p>
                      <form>
                        <textarea  name="comment" className="home-comment"/>
                      </form>
                    </div>
                  </div>
              )
            })
          }
    </div>
    }
    
    //console.log('suggestions.length'+ suggestions.length);
    return (
      <div>{homeContent}</div>
      
    )
  }
}

Home.prototypes = {
  getAllPosts : PropTypes.func.isRequired,
  deletePost : PropTypes.func.isRequired,
  likePost : PropTypes.func.isRequired,
  unlikePost : PropTypes.func.isRequired,
  getSuggestions : PropTypes.func.isRequired,
  posts : PropTypes.object.isRequired,
  suggestions : PropTypes.object.isRequired,
  auth : PropTypes.object.isRequired
  
};

const mapStateToProps = state => ({
      posts : state.posts,
      auth : state.auth,
      suggestions : state.posts.suggestions
      
});

export default connect(mapStateToProps, {getAllPosts,deletePost,likePost,unlikePost, getSuggestions}) (withRouter(Home));
