import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      isChecked: false,
    };
  }

  componentDidMount() {
    this.handlChecked();
  }

  handlChecked = () => {
    const { song } = this.props;
    const FAVORITE_SONGS_KEY = 'favorite_songs';

    if (!JSON.parse(localStorage.getItem(FAVORITE_SONGS_KEY))) {
      localStorage.setItem(FAVORITE_SONGS_KEY, JSON.stringify([]));
    }
    const readFavoriteSongs = JSON.parse(localStorage.getItem(FAVORITE_SONGS_KEY));
    readFavoriteSongs.filter(({
      trackId }) => {
      if (trackId === song.trackId) {
        this.setState({ isChecked: true });
      } return true;
    });
  };

  handleAddFavorite = async () => {
    const { handleLoading, song } = this.props;
    handleLoading();
    await addSong(song);
    handleLoading();
  };

  render() {
    const { isChecked } = this.state;
    const { index, song } = this.props;
    const audioAlt = `Track Name ${index + 1}`;

    return (
      <div>
        <h4>{ song.trackName }</h4>
        <Input
          id={ song.trackId }
          name="isSongSaved"
          testid={ `checkbox-music-${song.trackId}` }
          label="Favorita"
          type="checkbox"
          checked={ isChecked }
          onChange={ this.handleAddFavorite }
        />
        <audio data-testid="audio-component" src={ song.previewUrl } controls>
          <track kind="captions" />
          {audioAlt}
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  index: PropTypes.number.isRequired,
  handleLoading: PropTypes.func.isRequired,
  song: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ])).isRequired,
};

export default MusicCard;
