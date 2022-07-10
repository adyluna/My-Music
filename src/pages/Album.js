import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Carregando from './Carregando';

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

  handleLoading = () => {
    this.setState((prev) => ({ isSongSaved: !prev.isSongSaved }));
  };

  LoadAlbumMusics = () => {
    const { loadedAlbum, isSongSaved } = this.state;
    if (!isSongSaved) {
      return <Carregando />;
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
        <div className="albumSection">
        { loadedAlbum.slice(1).map((elem) => (<MusicCard
          key={ elem.trackId }
          song={ { ...elem } }
          handleLoading={ this.handleLoading }
        />)) }
        </div>
      </div>
    );
  };

  render() {
    const { loadedAlbum } = this.state;
    return (
      <div className="Album" data-testid="page-album">
        <Header />
        { loadedAlbum && <this.LoadAlbumMusics /> }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
};

Album.defaultProps = {
  match: null,
};

export default Album;
