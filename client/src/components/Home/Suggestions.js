import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SuggestionContent from './SuggestionContent';

class Suggestions extends Component {
  
  render() {
    const { suggestions } = this.props;
    return (
      <div>
        <h2>All Suggestions</h2>
         <SuggestionContent suggestions={suggestions}/>
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