import React, { ChangeEvent, MouseEventHandler, useEffect, useRef, useState } from 'react'

import { IoPlayCircle, IoPauseCircle, IoVolumeMute, IoVolumeHigh, IoExpand, IoContract, IoSad } from 'react-icons/io5';

import useMediaPlayer from '@/hooks/useMediaPlayer';
import useFullscreen from '@/hooks/useFullscreen';

import styles from './video.module.scss';
import fileTimer from '@/utils/frontend/fileTimer';

interface Props {
  url?: string;
  alt?: string;
  debug?: boolean; 
};

function Video({ url='/video/test.mp4' , alt='This video format is un supported', debug = false }: Props) {
  //** Refs **//
  const videoWrapperRef = useRef< null | HTMLDivElement >(null)
  const videoElementRef = useRef< null | HTMLVideoElement >(null);


  //** States **//
  const [ isInitial , setIsInitial ] = useState(true);

  const [ controlsAreVisible, setControlsAreVisible ] = useState(false);

  //** custom hooks **//
  const { isFullscreen, toggle: toggleScreenMood } = useFullscreen(videoWrapperRef);
  const {
    togglePlay,
    onVideoSetTime,
    toggleMute,
    onVideoSetVolume,
    mediaLength,
    currentMediaTime,
    isPlaying,
    volume,
    isMuted,
  } = useMediaPlayer(videoElementRef);

  const onVideoPlayerClick : MouseEventHandler = ( e ) => {
    const target = e.target as HTMLElement;
    if ( target.id === 'video' ) {
      setControlsAreVisible( curr => !curr );
    }
  };

  const initialPlay = () => {
    setIsInitial(false);
    togglePlay();
  }

  return (
    <div
      data-testid='wrapper'
      onClick={ onVideoPlayerClick }
      ref={ videoWrapperRef } className={ styles.videoWrapper }
    >
      <div data-testid='controls' aria-label={ controlsAreVisible ? 'controls' : 'hidden' } className={ styles.controls }>
        <div className={ styles.row }>
          <input 
            value={ currentMediaTime } 
            onChange={ onVideoSetTime } 
            className={ styles.videoTimeline } 
            step='0.01' type='range' aria-label='videoTimeline' name='video timeline' min='0' max={ typeof mediaLength === 'number' ? mediaLength : 0 } 
          />
        </div>
        <div className={ styles.row }>
          <button data-testid='playToggle' aria-label={ isPlaying ? 'pause button' : 'play button' } onClick={ togglePlay }>
            { !isPlaying ? <IoPlayCircle /> : <IoPauseCircle /> }
          </button>
          <button data-testid='screenToggle' aria-label={ isFullscreen ? 'full screen' : 'exit full screen' } onClick={ toggleScreenMood }>
            { !isFullscreen ? <IoExpand /> : <IoContract /> }
          </button>
          <div className={ styles.valueGroup }>
            <button data-testid='muteToggle' aria-label={ isPlaying ? 'hidden' : 'Mute button' } onClick={ toggleMute }>
              {
                isMuted ? <IoVolumeMute /> : <IoVolumeHigh />
              }
            </button>
            <input 
              value={ volume } 
              onChange={ onVideoSetVolume } 
              className={ styles.volumeMeter } 
              step='0.01' type='range' aria-label='volume slider' name='video volume' min='0' max='1' 
            />
          </div>
          <div className={ styles.timer }>
            { fileTimer(currentMediaTime, mediaLength) }
          </div>
        </div>
      </div>
      <div data-testid='overlay' className={ styles.playPrompt } aria-label={ !isInitial ? 'hidden' : 'play prompt' }>
        <button data-testid='overlayButton' aria-label={ !isInitial ? 'hidden' : 'play button' } onClick={ initialPlay }>
          <IoPlayCircle />
        </button>
      </div>
      <video
        data-testid='video' 
        preload='metadata'
        id='video' ref={ videoElementRef } 
        className={ styles.video }
        src={ url }
      />
    </div>
  )
}

export default Video