import { controlConstants } from '../constants';

const setCurrentMusic = (music) => {
  return {
    type: controlConstants.SET_CURRENT_MUSIC,
    payload: music,
  };
};

const setIsPlaying = (isPlaying) => {
  return {
    type: controlConstants.SET_IS_PLAYING,
    payload: isPlaying,
  };
};

export const controlsActions = { setIsPlaying, setCurrentMusic };
