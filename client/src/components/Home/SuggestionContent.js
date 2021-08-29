import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Suggestion from './Suggestion';

class SuggestionContent extends Component {
  render() {
    const { suggestions } = this.props;
    
       return suggestions.map(suggestion => <Suggestion key={suggestion._id} suggestion={suggestion} />);
    
  }
}

SuggestionContent.propTypes = {
  suggestions: PropTypes.array.isRequired
};

export default SuggestionContent
