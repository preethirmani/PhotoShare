import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/follow.css'

export default class FollowComponent extends Component {
  render() {
    const { follow } = this.props;
    return (
      <div>
        <div className='card-body'>
        <Link className='follow-handle' to={`/profilehanlde/${follow.handle}`}>
          {follow.handle}
        </Link>
        </div>
      </div>
    )
  }
}
