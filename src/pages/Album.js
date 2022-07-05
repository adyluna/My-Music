import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Carregando from './Carregando';
import { addSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      loadedAlbum: null,
      isSongSaved: true,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const fetchResult = await getMusics(id);
    this.setState({ loadedAlbum: fetchResult });
  }

  // onChange = ({ target }) => {
  //   const { name } = target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   this.setState({
  //     [name]: value,
  //   })
  // };

  handleLoading = () => {
    this.setState((prev) => ({isSongSaved: !prev.isSongSaved}))
  };

  LoadAlbumMusics = () => {
    const { loadedAlbum, isSongSaved } = this.state;
    if (!isSongSaved) {
      return <Carregando />
    } return (
      <div
        key={
          loadedAlbum[0].amgArtistId
            ? loadedAlbum[0].amgArtistId
            : loadedAlbum[0].trackId
        }
      >
        <h3 data-testid="artist-name">{ loadedAlbum[0].artistName }</h3>
        <h3 data-testid="album-name">{loadedAlbum[0].collectionName}</h3>
        { loadedAlbum.slice(1).map((elem, index) => 
            <MusicCard
          index={ index }
          key={ elem.trackId }
          song={ {...elem} }
          handleLoading={ this.handleLoading }
        />
        ) }
      </div>
    );
  };

  render() {
    const { loadedAlbum } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loadedAlbum && <this.LoadAlbumMusics /> }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
};

Album.defaultPropTypes = {
  match: null,
};

export default Album;
