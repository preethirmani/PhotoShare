import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Post from './Post';



import "../../css/home.css";

class PostsContent extends Component {

  

  render() {
    const { posts } = this.props;

    return posts.map(post => {

      if(post.user !== null) {
        return (
           <Post key={post._id} post={post} />);
        
      }
     
    } )
  }

}

PostsContent.propTypes = {
  posts: PropTypes.array.isRequired
};


export default  PostsContent;
