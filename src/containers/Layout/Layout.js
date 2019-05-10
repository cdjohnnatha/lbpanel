import React, { Component } from 'react';
import './Layout.css';
import { connect } from 'react-redux';

class Layout extends Component {
  render() {
    return (
      <div>
        <main className="mb-4">{this.props.children}</main>
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

export default connect(mapStateToProps)(Layout);
