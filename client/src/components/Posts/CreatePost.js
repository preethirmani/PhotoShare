import axios from 'axios';
import React, { Component } from 'react';

export default class CreatePost extends Component {

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
        image: data.secure_url
      };
    })
  }

  render() {
    return (
      <div>
        <label>Upload Photo</label>
        <input type='file' onChange = {this.uploadImage.bind(this)}/>
        <button onClick = {this.onSubmit.bind(this)} >Upload Image</button>
      </div>
    )
  }
}
