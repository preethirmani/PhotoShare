import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { getAllPosts,likePost,unlikePost,deletePost } from '../../actions/PostActions';
import "../../css/home.css";

class Home extends Component {

  componentDidMount() {
    this.props.getAllPosts();
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

    const  postsArr  = this.props.posts.posts;
    console.log('POsts in home.js::' + this.props.posts.posts);
    console.log('postsARR' + postsArr);
    const { auth } = this.props;

    return (
      <div className='main-div-home'>
          {
            postsArr.map(item => {
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
        <div className = "div-suggestions">
          <div className= "card-body">
            <h6 className= "card-title">Suggestions for you</h6>
          <a href="#" className= "btn btn-primary">Go somewhere</a>
          </div>
        </div>

      </div>

      
    )
  }
}

Home.prototypes = {
  getAllPosts : PropTypes.func.isRequired,
  deletePost : PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
      posts: state.posts,
      auth: state.auth
});

export default connect(mapStateToProps, {getAllPosts,deletePost,likePost,unlikePost}) (withRouter(Home));
