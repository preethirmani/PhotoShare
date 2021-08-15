import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import home from '../../img/home.png';
import newPost from '../../img/newPost.png';
import allPosts from '../../img/allPosts.png';
import like from '../../img/like.png';
import '../../css/navBar.css'

export default class Navbar extends Component {
  render() {
    return (
      
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container">
        <h3 class=" brand-name" to="#">PhotoShare</h3>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse flex-row-reverse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="#">
                <img class="img-navbar" src={home} /></Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="#">
                <img class="img-navbar" src={newPost}/>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="#">
                <img class="img-navbar" src={allPosts}/>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="#">
                <img class="img-navbar" src={like}/>
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
    )
  }
}
