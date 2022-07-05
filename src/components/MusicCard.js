import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      isSongChecked: false,
    };
  }

  render() {
    const { index, song, handleLoading } = this.props;
    const audioAlt = `Track Name ${index + 1}`;

    const handleAddFavorite = async () => {
      handleLoading();
      await addSong(song);
      handleLoading();
    };

    return (
      <div>
        <h4>{ song.trackName }</h4>
        <Input
          name="isSongSaved"
          testid={`checkbox-music-${song.trackId}`}
          label="Favorita"
          type="checkbox"
          onChange={ handleAddFavorite }
        />
        <audio data-testid="audio-component" src={ song.previewUrl } controls>
          <track kind="captions"/>
          {audioAlt}
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  index: PropTypes.number.isRequired,
};

export default MusicCard;
