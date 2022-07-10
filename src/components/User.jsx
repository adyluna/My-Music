import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class User extends Component {
  render() {
    const { name, image, email, description } = this.props;
    const editProfile = 'Editar perfil';
    return (
      <div className="userSection">
        <img
          data-testid="profile-image"
          className="profileImage"
          src={ image }
          alt={ image }
        />
        <Link to="/profile/edit">{editProfile}</Link>
        <h3>{ name }</h3>
        <h4>{ email }</h4>
        <h5>Descrição</h5>
        { description }
      </div>
    );
  }
}

User.propTypes = {
  description: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default User;
