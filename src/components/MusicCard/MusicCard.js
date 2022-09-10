import './MusicCard.css';

const MusicCard = ({ name, artist, cover, audio }) => {
  return (
    <div className='MusicCard'>
      <img className='CardImage' src={cover} alt='...' />
      <span className='CardText'>{name}</span>
      <span className='CardText'>{artist}</span>
    </div>
  );
};

export default MusicCard;
