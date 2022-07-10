import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import EditForm from '../components/EditForm';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      user: false,
    };
  }

  componentDidMount() {
    this.handleLoadUser();
  }

  handleLoadUser = async () => {
    const user = await getUser();
    this.setState({ user });
  };

  RenderEditForm = () => {
    const { user } = this.state;
    const { handleChange } = this.props;
    if (!user) {
      return <Carregando />;
    } return <div className="profileEditForm"><EditForm user={ user } handleChange={ handleChange } /></div>;
  }

  render() {
    const { user } = this.state;
    return (
      <div className="profileEdit" data-testid="page-profile-edit">
        <Header />
        { user && <this.RenderEditForm /> }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default ProfileEdit;
