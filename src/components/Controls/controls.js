import React, { useState, useRef, useEffect } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import { BsArrowRightShort } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { controlsActions } from '../../store/actions';

import './Controls.css';

const Controls = ({ audioSource }) => {
  const dispatch = useDispatch();

  const allMusic = useSelector((state) => state.controls.allMusic);
  const currentMusic = useSelector((state) => state.controls.currentMusic);
  const isPlaying = useSelector((state) => state.controls.isPlaying);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    dispatch(controlsActions.setIsPlaying(!isPlaying));
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  if (isPlaying) {
    dispatch(controlsActions.setIsPlaying(true));
    audioPlayer.current.play();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      '--seek-before-width',
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  const prevTrack = () => {
    const currentIndex = allMusic.findIndex((m) => m.id === currentMusic.id);
    if (currentIndex === 0) {
      dispatch(controlsActions.setCurrentMusic(allMusic[allMusic.length - 1]));
    } else {
      dispatch(controlsActions.setCurrentMusic(allMusic[currentIndex - 1]));
    }

    dispatch(controlsActions.setIsPlaying(true));
    audioPlayer.current.play();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const nextTrack = () => {
    const currentIndex = allMusic.findIndex((m) => m.id === currentMusic.id);
    if (currentIndex === allMusic.length - 1) {
      dispatch(controlsActions.setCurrentMusic(allMusic[0]));
    } else {
      dispatch(controlsActions.setCurrentMusic(allMusic[currentIndex + 1]));
    }
    dispatch(controlsActions.setIsPlaying(true));
    audioPlayer.current.play();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  return (
    <div>
      <audio
        ref={audioPlayer}
        src={audioSource}
        preload='metadata'
        autoPlay
      ></audio>
      <button className='ControlButton' onClick={prevTrack}>
        <BsArrowLeftShort onClick={prevTrack} />
      </button>
      <button className='PlayButton' onClick={togglePlayPause}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <button className='ControlButton' onClick={nextTrack}>
        <BsArrowRightShort />
      </button>

      <div className='TimeText'>{calculateTime(currentTime)}</div>

      <input
        className='RangeInput'
        type='range'
        defaultValue='0'
        ref={progressBar}
        onChange={changeRange}
      />

      <div>
        {!isNaN(duration)
          ? duration && !isNaN(duration) && calculateTime(duration)
          : null}
      </div>
    </div>
  );
};

export default Controls;
