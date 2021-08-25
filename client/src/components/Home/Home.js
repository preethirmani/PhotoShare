import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getAllPosts } from '../../actions/PostActions';
import "../../css/home.css";

class Home extends Component {

  componentDidMount() {
    this.props.getAllPosts();
  }

  render() {

    const  postsArr  = this.props.posts.posts;
    console.log('POsts in home.js::' + this.props.posts.posts);
    console.log('postsARR' + postsArr);
    return (
      <div className='main-div-home'>
          {
            postsArr.map(item => {
              return( 
                  <div className= "card card-posts">
                    <h6 className= "card-title ">{item.handle}</h6>
                    <img className= "card-img-top img-posts-home" src={item.image} alt="Card image cap"/>
                    <div className= "card-body">
                      <p className= "card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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
  posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
      posts: state.posts
});

export default connect(mapStateToProps, {getAllPosts}) (withRouter(Home));
