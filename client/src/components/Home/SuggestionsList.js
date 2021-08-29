import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import SuggestionContent from './SuggestionContent';

class SuggestionsList extends Component {
  render() {
    const { suggestions } = this.props;
    console.log('Suggestions'+suggestions);
    
   
    return (
      <div>
         <div className ='card suggestions-card' >
           <div className='card-body'>
             <h6 className='card-subtitle suggestion-title mb-2 text-muted'>Suggestions For You</h6>
             <Link>
              <h6 className='card-subtitle mb-2 suggestion-title-All text-muted'>See All</h6>
             </Link>
             
              <SuggestionContent suggestions={suggestions}/>
           </div>
          
        </div>
        
        
      </div>
    )
  }
}
SuggestionsList.propTypes = {
  suggestions : PropTypes.array.isRequired
};

export default  SuggestionsList;