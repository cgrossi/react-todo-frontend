import React from 'react';
import '../css/Loading.css';

const Loading = () => {
  return (
    <div className="Loading ui segment">
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading...</div>
      </div>
    </div>
  )
}

export default Loading