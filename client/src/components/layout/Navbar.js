import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authActions';
import home from '../../img/home.png';
import newPost from '../../img/newPost.png';
import allPosts from '../../img/allPosts.png';
import like from '../../img/like.png';
import '../../css/navBar.css'

class Navbar extends Component {

  onLogoutClick(e) {
    console.log('logout clicked')
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push('/');
  }
  render() {
   const { isauthenticated, user }=this.props.auth;

    return (
      
    <nav className= "navbar navbar-expand-lg fixed-top navbar-light">
      <div className= "container">
        <h3 className= " brand-name" to="#">PhotoShare</h3>
        <button className= "navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className= "navbar-toggler-icon"></span>
        </button>
        <div className= "collapse navbar-collapse flex-row-reverse" id="navbarNavDropdown">
          <ul className= "navbar-nav">
            <li className= "nav-item">
              <Link className= "nav-link active" aria-current="page" to="/home">
                <img className= "img-navbar" src={home} /></Link>
            </li>
            <li className= "nav-item">
              <Link className= "nav-link" to="/createPost">
                <img className= "img-navbar" src={newPost}/>
              </Link>
            </li>
            <li className= "nav-item">
              <Link className="nav-link" to="#">
                <img className="img-navbar" src={allPosts}/>
              </Link>
            </li>
            <li className= "nav-item">
              <Link className= "nav-link" to="#">
                <img className= "img-navbar" src={like}/>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown" role="button" 
             aria-expanded="false"
               href="#" >
               <img className="rounded-circle"
               src={user.avatar} alt={user.name} style={{ width: "25px", marginRight: "5px" }}/>
              
               </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className ="dropdown-item" href="/profile">Profile</a></li>
                  <li><a className ="dropdown-item" onClick={this.onLogoutClick.bind(this)} > Logout
                  </a>
                  </li>
                </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    )
  }
}

Navbar.propTypes = {
  logoutUser : PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
 
})

export default connect(mapStateToProps, {logoutUser}) (Navbar);
