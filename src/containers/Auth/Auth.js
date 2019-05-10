import React, { Component } from 'react'
import { Form, Button, Row, Alert, Card } from 'react-bootstrap';
import { auth, setRedirectPath } from '../../store/actions/auth';
import { connect } from "react-redux";
import { updateObject } from "../../shared/utility";
import { Redirect } from 'react-router-dom';
import './Auth.css';

const { Group, Label, Control } = Form;

class Auth extends Component {
    state = {
      controls: {
        password: {
          value: ''
        },
        email: {
          value: ''
        },
      }
    };

  componentDidMount() {
    if (this.props.redirectPath !== '/') {
      this.props.onSetRedirectPath('/');
    }
  }

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value)
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
      })
    })

    this.setState({ controls: updatedControls })
  }

  render() {
    let errorMessage = null;

    if (this.props.error) {
      errorMessage = 
      <Alert show={this.state.showAlert} variant={'danger'}>
        {this.props.error}
      </Alert>
    }
    if (this.props.isAthenticated) {
      return <Redirect to='/' />
    }
    
    return (
      <Card id="bg-login" className="col-sm-12">
        <Card.Img variant="top" src="assets/images/LOGO2.png" id="logo" />
        <Card.Body sm={2}>
          {errorMessage}
          <Form onSubmit={this.submitHandler}>
            <Group as={Row}>
              <Control
                type="email"
                className="required"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Digite seu email"
                onChange={event => this.inputChangedHandler(event, event.target.id)}
                value={this.state.value}
              />
            </Group>
            <Group as={Row}>
              <Control
                type="password"
                className="required"
                id="password"
                placeholder="Digite sua senha"
                minLength='8'
                onChange={event => this.inputChangedHandler(event, event.target.id)}
                value={this.state.value}
                />
            </Group>
            <Group as={Row}>
              <Button block type="submit">Entrar</Button>
            </Group>
          </Form>
        </Card.Body>
      </Card>
    )
  }
}

const mapStatToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error || null,
    isAthenticated: state.auth.user !== null,
    redirectPath: state.auth.redirectPath
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(auth(email, password)),
    onSetRedirectPath: (path) => dispatch(setRedirectPath(path)),
  };
}


export default connect(mapStatToProps, mapDispatchToProps)(Auth);;
