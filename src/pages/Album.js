import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      loadedAlbum: null,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const fetchResult = await getMusics(id);
    this.setState({ loadedAlbum: fetchResult });
  }

  LoadAlbumMusics = () => {
    const { loadedAlbum } = this.state;
    return (
      <div
        key={
          loadedAlbum[0].amgArtistId
            ? loadedAlbum[0].amgArtistId
            : loadedAlbum[0].trackId
        }
      >
        <h3 data-testid="artist-name">{ loadedAlbum[0].artistName }</h3>
        <h3 data-testid="album-name">{loadedAlbum[0].collectionName}</h3>
        { loadedAlbum.slice(1).map(({ trackName, previewUrl, trackId }, index) => (
          <MusicCard
            index={ index }
            key={ trackId }
            trackName={ trackName }
            previewUrl={ previewUrl }
          />)) }
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
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
