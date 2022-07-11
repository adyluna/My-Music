import React, { Component } from 'react';
import Header from '../components/Header';
import User from '../components/User';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Profile extends Component {
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

  RenderUser = () => {
    const { user } = this.state;
    if (!user) {
      return <Carregando />;
    } return (
      <div className="profileSection">
        <User
          name={ user.name }
          image={ user.image }
          description={ user.description }
          email={ user.email }
        />
      </div>);
  }

  render() {
    const { user } = this.state;
    return (
      <div className="Profile" data-testid="page-profile">
        <Header />
        { user && <this.RenderUser /> }
      </div>
    );
  }
}

export default Profile;
