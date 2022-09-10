import { controlConstants } from '../constants';
import chillHop from '../data';

const initialMusic = chillHop();
const initalState = {
  currentId: 0,
  currentMusic: initialMusic[0],
  allMusic: initialMusic,
  isPlaying: false,
};

export function controls(state = initalState, { type, payload }) {
  switch (type) {
    case controlConstants.SET_CURRENT_MUSIC:
      return {
        ...state,
        currentMusic: payload,
      };
    case controlConstants.SET_IS_PLAYING:
      return {
        ...state,
        isPlaying: payload,
      };
    default:
      return state;
  }
}
