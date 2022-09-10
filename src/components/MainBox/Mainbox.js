import Controls from '../Controls/controls';
import { useSelector } from 'react-redux';
// import { controlsActions } from '../../store/actions';

import './MainBox.css';

const MainBox = () => {
  const currentMusic = useSelector((state) => state.controls.currentMusic);

  return (
    <div className='MainBoxContainer'>
      <img className='MainBoxImage' src={currentMusic.cover} alt='...' />
      <div className='MainBoxText'>{currentMusic.artist}</div>
      <div className='MainBoxText'> {currentMusic.name}</div>

      <Controls audioSource={currentMusic.audio} />
    </div>
  );
};

export default MainBox;
