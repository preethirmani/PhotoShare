import axios from 'axios';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter} from 'react-router-dom';
import createPost from '../../css/createPost.css';
import { createNewpost } from '../../actions/PostActions'

class CreatePost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image:'',
      text:'',
      formData : new FormData()
    };
  }

 // const [ imageSelected, setImageSelected ] = useState("");
  

  uploadImage(e) {
    console.log(e.target.files[0]);
    const d = new FormData();
    d.append('file', e.target.files[0]);
    d.append('upload_preset', 'fotoshare');
    d.append('cloud_name','phtoshare')
    console.log('imageURL::'+ URL.createObjectURL(e.target.files[0]));
    
    this.setState({
      formData:d
    });
  }

  onChange(e) {
    this.setState({[e.target.name]:e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.formData);
    //Upload the image to cloudinary
  fetch(
    
     "https://api.cloudinary.com/v1_1/phtoshare/image/upload", {
      method: 'POST',  
      body: this.state.formData  
  }).then (res => res.json())
    .then(data => {
      console.log(data)
      const newPost = {
        image: data.secure_url,
        text: this.state.text
      };
      console.log('newPost.text::'+newPost.text);
      this.props.createNewpost(newPost)
    
    })
  }

  render() {
    return (
    <div className= "row d-flex justify-content-center main-div-createPost ">
       <div className='card crtPst-wrapper'>
          <div className="card-header headr-crtPsr">
              <h4 className="card-title title-crtPst">New Post</h4>
          </div>
          <div className='card-body card-createPost'>

            <input type='file' className='crtPst inpt-crtPst '
             onChange = {this.uploadImage.bind(this)}/>
             <textarea className='crtPst txt-crtPst' name='text'
             value={this.state.text} onChange={this.onChange.bind(this)}/>
             <Link  className='crtPst' 
             onClick = {this.onSubmit.bind(this)} 
             className="btn btn-primary btn-ctrPst">Submit Post</Link>
          </div>
       </div>  
    </div>

 

    
    )
  }
}



const mapStateToProps = (state) => ({
 
  errors: state.errors
})

export default connect (mapStateToProps, {createNewpost}) (withRouter(CreatePost));
