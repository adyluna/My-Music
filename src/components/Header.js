import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

  loadHeader = () => {
    const { isUserLoaded } = this.state;
    return (
      <div className='Header' >
        <h3 data-testid="header-user-name">
          { isUserLoaded }
        </h3>
        <div className="nagivation">
        <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Músicas Favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </div>
      </div>
    );
  }

  render() {
    const { isUserLoaded } = this.state;
    return (
      <header data-testid="header-component">
        { isUserLoaded
          ? this.loadHeader()
          : <Carregando /> }
      </header>
    );
  }
}

export default Header;
