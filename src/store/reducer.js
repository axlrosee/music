import { combineReducers } from 'redux';
import { controls } from './reducers';

export default function rootReducer() {
  return combineReducers({ controls });
}
