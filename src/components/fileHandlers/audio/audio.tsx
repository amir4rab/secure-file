import { ChangeEvent, MouseEventHandler, useEffect, useRef, useState } from 'react'
import { IoPlayCircle, IoPauseCircle, IoVolumeMute, IoVolumeHigh, IoExpand, IoContract, IoSad } from 'react-icons/io5';

interface Props {
  url: string;
  alt?: string;
  className?: string;
};

import styles from './audio.module.scss';

import fileTimer from '@/utils/frontend/fileTimer';
import useMediaPlayer from '@/hooks/useMediaPlayer';

function Audio({ url, alt, className }: Props) {
  //** Refs **//
  const srcElementRef = useRef< null | HTMLVideoElement >(null);

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
  } = useMediaPlayer(srcElementRef);

  return (
    <div
      data-testid='wrapper'
      className={ styles.audioWrapper }
    >
      <div data-testid='controls' aria-label={ 'controls' } className={ styles.controls }>
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
            { fileTimer( currentMediaTime, mediaLength) }
          </div>
        </div>
      </div>
      <audio
        data-testid='audio' 
        preload='metadata'
        id='audio' ref={ srcElementRef } 
        className={ styles.audio }
        src={ url }
      />
    </div>
  )
}

export default Audio