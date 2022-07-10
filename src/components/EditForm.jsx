import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Input from './Input';
import { updateUser } from '../services/userAPI';

class EditForm extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      image: '',
      description: '',
      email: '',
      saveButtonDisabled: true,
    };
  }

  componentDidMount() {
    this.renderUserInfo();
  }

  emailValidation = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  handleButton = () => {
    const { name, image, description, email } = this.state;
    if (name.length > 0
      && description.length > 0
      && image.length > 0
      && email.length > 0
      && this.emailValidation(email)) {
      this.setState({
        saveButtonDisabled: false,
      });
    } else {
      this.setState({
        saveButtonDisabled: true,
      });
    }
  };

  renderUserInfo = () => {
    const { user } = this.props;
    const { name, image, description, email } = user;
    this.setState({ name, image, description, email });
  };

  onChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.handleButton());
  };

  handleRedirect = async () => {
    const { name, image, description, email } = this.state;
    const { handleChange } = this.props;
    await updateUser({ name, image, description, email });
    handleChange();
  };

  render() {
    const { name, image, description, email, saveButtonDisabled } = this.state;
    return (
      <form>
        <Input
          name="name"
          type="text"
          testid="edit-input-name"
          label="Nome"
          value={ name }
          onChange={ this.onChange }
        />
        <Input
          name="email"
          type="text"
          testid="edit-input-email"
          label="Email"
          value={ email }
          onChange={ this.onChange }
        />
        <Input
          name="description"
          type="textarea"
          testid="edit-input-description"
          label="Descrição"
          value={ description }
          onChange={ this.onChange }
        />
        <Input
          name="image"
          type="text"
          testid="edit-input-image"
          label="Foto"
          value={ image }
          onChange={ this.onChange }
        />
        <button
          data-testid="edit-button-save"
          type="button"
          onClick={ () => this.handleRedirect() }
          disabled={ saveButtonDisabled }
        >
          Salvar
        </button>
      </form>
    );
  }
}

EditForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  user: PropTypes.shape({
    description: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default EditForm;
