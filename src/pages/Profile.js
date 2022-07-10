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
    // const description = `
    //   Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    //   sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    //   Ut enim ad minim veniam, quis nostrud exercitation ullamco
    //   laboris nisi ut aliquip ex ea commodo consequat.
    //   Duis aute irure dolor in reprehenderit in voluptate velit esse
    //   cillum dolore eu fugiat nulla pariatur.
    //   Excepteur sint occaecat cupidatat
    //   non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

    // const defaultProfileImage = `https://media.istockphoto.com/vectors/
    //   male-profile-flat-blue-simple-icon-with-long-shadow-vector-
    //   id522855255?k=20&m=522855255&s=612x612&w=0&h=
    //   fLLvwEbgOmSzk1_jQ0MgDATEVcVOh_kqEe0rqi7aM5A=`;
    if (!user) {
      return <Carregando />;
    } return (<User
      name={ user.name }
      image={ user.image }
      description={ user.description }
      email={ user.email }
    />);
  }

  render() {
    const { user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { user && <this.RenderUser /> }
      </div>
    );
  }
}

export default Profile;
