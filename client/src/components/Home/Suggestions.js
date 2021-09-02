import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SuggestionContent from './SuggestionContent';
import '../../css/Suggestions.css';

class Suggestions extends Component {
  
  render() {
    const { suggestions } = this.props;
    return (
    <div className='row d-flex justify-content-center main-div-sggnall'>      
      <div className='card suggestions-all-card'>
        <div className='card-header suggestions-all-header'>
          <h6 className='all-suggestions card-subtitle suggestion-title mb-2 text-muted'>All Suggestions</h6>
        </div>
        <div className='card-body'>
         <SuggestionContent suggestions={suggestions}/>
        </div>
      </div>
    </div>

    )
  }
}

Suggestions.propTypes = {
  suggestions : PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  suggestions : state.posts.suggestions
});


export default connect (mapStateToProps,{}) (Suggestions);