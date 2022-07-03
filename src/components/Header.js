import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Carregando from '../pages/Carregando';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      isUserLoaded: null,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ isUserLoaded: user.name });
  }

  render() {
    const { isUserLoaded } = this.state;
    return (
      <header data-testid="header-component">
        { isUserLoaded
          ? <h3 data-testid="header-user-name">{ isUserLoaded }</h3>
          : <Carregando /> }
      </header>
    );
  }
}

export default Header;
