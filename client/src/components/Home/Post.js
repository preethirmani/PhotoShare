import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { likePost,unlikePost,deletePost, addComment } from '../../actions/PostActions';
import "../../css/home.css";
import AddComment from '../comment/AddComment';
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
    console.log('like'+id);
    this.props.likePost(id);
  }

  onUnlikeClick(id) {
    window.alert('Unlike'+id);
    this.props.unlikePost(id);
  }

  

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }



  render() {
    const { post, auth} = this.props;
    let likedbyList = post.likes.filter((like,index) => index === 0);
    let likedby = likedbyList.map(liked=> liked.handle);
    let comments = post.comments.filter(comment => comment.user !== null)
    let hasLiked = false;
    let user;
    console.log('post.user._id' + post.user.id);
     if (post.likes.filter(like => like.user === auth.user.id).length > 0) {
      hasLiked = true;
    } 
   
    return (
      
     <div className= "card card-posts">
      <div className="post-title">
        <Link to={`/profilehanlde/${post.handle}`}>
          <img className='rounded-circle post-title-image'
            src={post.user.avatar} alt='avatar'/>
        </Link>
        <Link className='post-title-Link' to={`/profilehanlde/${post.handle}`}>
          <h6 className= "card-title post-title ">{post.handle}</h6>
        </Link>
      </div>
      <img className= "card-img-top img-posts-home" src={post.image} alt="Card image cap"/>
                    
      <div className= "card-body card-content-posts">
        <div className='icons'>
          { (hasLiked) ? (
              <div type="button">
                <i className='fa fa-heart' 
                  style={{ fontSize: "1.5em", color: "red" }}
                  onClick={this.onUnlikeClick.bind(this, post._id)}
                  aria-hidden='true'
                />
              </div>
            ) : (                  
              <div type="button">
                <i className='fa fa-heart-o'
                  onClick={this.onLikeClick.bind(this, post._id)}
                  style={{ fontSize: "1.5em", color: "black" }}
                  aria-hidden='true'
               />
              </div>
            )
          }
                            
          {post.user._id === auth.user.id ? (
           <div type="button" className="button delete-btn"
              onClick={this.onDeleteClick.bind(this, post._id)}>
             <i className="fa fa-trash home-del-icon"  
             style={{ fontSize: "1.25em", color: "black" }}/>
            </div>
           ) : null}
        </div>                         
         <div className='div-likes-text'>
            {post.likes && post.likes.length } likes
                        
      </div>
                      
       <div>
          <Link className='post-handle' to={`/profilehanlde/${post.handle}`} >
            {post.handle}
          </Link>
          <span className='post-text'> &nbsp; {post.text} </span>
        </div>
                        
        <div>
          <Comments comments={comments} postId={post._id} 
              showDelete={true}/>
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
