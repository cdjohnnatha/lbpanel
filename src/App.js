import React, { Component } from 'react';
import { Route, Switch, withRouter, Router } from 'react-router-dom';

import './App.css';
import Layout from './containers/Layout/Layout';
import history from './history';
import Auth from './containers/Auth/Auth'
import Logout from './containers/Logout/Logout'
import Index from './containers/Index/Index';
import { authCheckState } from './store/actions/auth'

import { connect } from "react-redux";

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes =
        <Router history={history}>
          <Switch>
            <Route path="/" component={Auth} />
          </Switch>
        </Router>
      if (this.props.isAuthenticated) {
        routes = (
          <Router history={history}>
            <Switch>
                <Route path="/" exact component={Index} />
                <Route path="/logout" component={Logout} />
            </Switch>
          </Router>
        );
      }
    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};


const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));