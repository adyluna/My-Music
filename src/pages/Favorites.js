import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Carregando from './Carregando';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      isSongSaved: true,
      loadedFavorites: null,
    };
  }

  async componentDidMount() {
    this.renderFavorites();
  }

  componentDidUpdate() {
    this.renderFavorites();
  }

  renderFavorites = async () => {
    const results = await getFavoriteSongs();
    console.log(results);
    this.setState({ loadedFavorites: [...results] });
  };

  handleLoading = () => {
    this.setState((prev) => ({ isSongSaved: !prev.isSongSaved }));
  };

  LoadFavorites = () => {
    const { isSongSaved, loadedFavorites } = this.state;
    if (!isSongSaved) {
      return <Carregando />;
    }
    if (loadedFavorites.length === 0) {
      return <h4>Você ainda não possui músicas favoritas</h4>;
    } return (
      <div className="favoritesSection">
        {loadedFavorites.map((elem) => (<MusicCard
          key={ elem.trackId }
          song={ { ...elem } }
          handleLoading={ this.handleLoading }
        />))}
      </div>
    );
  };

  render() {
    const { loadedFavorites } = this.state;
    return (
      <div className="Favorites" data-testid="page-favorites">
        <Header />
        { loadedFavorites && <this.LoadFavorites /> }
      </div>
    );
  }
}

export default Favorites;
