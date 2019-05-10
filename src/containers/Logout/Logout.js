import React, { Component } from 'react'
import { logout } from '../../store/actions/auth';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

class Logout extends Component {

  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to='/'></Redirect>;
  }
}

const mapStatToProps = state => {
  return {
    loading: state.auth.loading,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(logout()),
  };
}


export default connect(mapStatToProps, mapDispatchToProps)(Logout);;
