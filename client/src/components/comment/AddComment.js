import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { addComment } from '../../actions/PostActions';
import '../../css/comments.css';


class AddComment extends Component {
 constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };
   
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value });
  }
  postComment(id) {
    const { user } = this.props.auth;
    console.log('this.state.text'+ this.state.text);

    const newComment = {

      name: user.name,
      avatar: user.avatar,
      text: this.state.text
    };

    console.log('newComment.text'+ newComment.text);
  
    this.props.addComment(id, newComment);
  
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  render() {
   
    return (
     <div className ='home-comment-div' > 
      <form className='add-comment-form' >
        <textarea type='text' className="home-comment" name="text"
         placeholder="Add new comment..."
          value={this.state.text} onChange={this.onChange.bind(this)}>
          </textarea>
   
          <Link className='post-comment' 
            onClick= {this.postComment.bind(this, this.props.postId)} >
            Post
          </Link>
        
      </form>
    </div>
    )
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps, { addComment })(AddComment);

