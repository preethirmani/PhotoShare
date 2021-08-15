import React, { Component } from 'react';
import "../../css/home.css"

export default class Home extends Component {
  render() {
    return (
     
      <div className='main-div-home'>
        <div className="posts-wrapper"> 
          <div className= "card card-posts">
            <img className= "card-img-top img-posts-home" src="https://images.unsplash.com/photo-1536302829663-a460b9ec95b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60" alt="Card image cap"/>
            <div className= "card-body">
              <p className= "card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <form>
                <textarea  name="comment" className="home-comment"/>
              </form>
            </div>
        
          <div className= "card card-posts">
            <img className= "card-img-top img-posts-home" src="https://images.unsplash.com/photo-1575143356756-40baf33e5375?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="Card image cap"/>
            <div className= "card-body">
              <p className= "card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <form>
                <textarea  name="comment" className="home-comment"/>
              </form>
            </div>
          </div>

          </div>
        </div> 



        
        
        

        

        <div className = "div-suggestions">
          <div className= "card-body">
            <h5 className= "card-title">Suggestions for you</h5>
            
            <a href="#" className= "btn btn-primary">Go somewhere</a>
          </div>
        </div>

      </div>

      
    )
  }
}
