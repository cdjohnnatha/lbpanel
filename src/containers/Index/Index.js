import React, { Component } from 'react';
import { connect } from 'react-redux';


class Index extends Component {
  render() {
    return (
      <div className="container">
        <h1>Local</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
    console.log(state.auth);
    return {
      isAuthenticated: state.auth.client !== null
    }
  }
  
  export default connect(mapStateToProps)(Index);
  
