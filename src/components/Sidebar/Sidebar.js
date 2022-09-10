import MusicCard from '../MusicCard/MusicCard';
import { controlsActions } from '../../store/actions';
import './Sidebar.css';
import { useDispatch, useSelector } from 'react-redux';

const Sidebar = () => {
  const dispatch = useDispatch();
  const allMusic = useSelector((state) => state.controls.allMusic);

  return (
    <div className='SidebarContainer'>
      {allMusic?.map((item) => (
        <div
          style={{ marginBottom: '30px', width: '30%' }}
          onClick={() => {
            dispatch(controlsActions.setCurrentMusic(item));
            dispatch(controlsActions.setIsPlaying(true));
          }}
        >
          <MusicCard
            key={item.id}
            name={item.name}
            artist={item.artist}
            cover={item.cover}
          />
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
