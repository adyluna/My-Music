import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Input from './Input';
import Carregando from './Carregando';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      userSaved: false,
    };
  }

  displayLoading = () => this.setState({ loading: true })

  isUserSaved = () => this.setState({ userSaved: true })

  loginInput = () => {
    const { disabled, name, value, onChange } = this.props;
    const { loading } = this.state;
    return (
      <div data-testid="page-login">
        <Input
          name={ name }
          type="text"
          value={ value }
          testid="login-name-input"
          onChange={ onChange }
        />
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ disabled }
          onClick={ async () => {
            this.displayLoading();
            await createUser({ name: value });
            this.isUserSaved();
          } }
        >
          Entrar
        </button>
        { loading && <Carregando /> }
      </div>
    );
  }

  render() {
    const { userSaved } = this.state;

    return (
      <div>
        { userSaved ? <Redirect to="/search" /> : this.loginInput() }
      </div>
    );
  }
}

Login.propTypes = {
  disabled: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Login;
