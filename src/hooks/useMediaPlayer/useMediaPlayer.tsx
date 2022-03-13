import React, { ChangeEvent, useState, useEffect, useRef } from 'react';

const useMediaPlayer = ( mediaElementRef: React.MutableRefObject< null | HTMLVideoElement | HTMLVideoElement > ) => {
  //** media state **//
  const [ mediaLength, setMediaLength ] = useState(0);
  const [ currentMediaTime, setCurrentMediaTime ] = useState(0);
  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ volume, setVolume ] = useState(1);
  const [ isMuted, setIsMuted ] = useState(false);

  const isPlayingInterval = useRef< null | NodeJS.Timer >(null)

  const togglePlay = () => {
    if ( mediaElementRef.current === null ) return;
    if ( !isPlaying ) {
      try {
  
        if ( mediaLength === 0 ) {
          const duration = (+mediaElementRef.current.duration).toFixed(2);
          setMediaLength( +duration );
        }
  
        if ( currentMediaTime.toFixed(2) === mediaLength.toFixed(2) ) {
          setCurrentMediaTime(0);
          setVideoTime(0);
        }
  
        mediaElementRef.current?.play();
        setIsPlaying(true);
      } catch( err ) { { console.error(err) } };
    } else {
      try {
        mediaElementRef.current.pause();
        setIsPlaying(false);
      } catch( err ) { console.error(err) };
    }
  };

  const setVideoTime = (input : number) => {
    if ( mediaElementRef.current === null ) return false;
    mediaElementRef.current.currentTime = input;
    return true;
  }

  const onVideoSetTime = ( e: ChangeEvent ) => {
    const element = e.target as HTMLInputElement;
    setCurrentMediaTime(+element.value);
    setVideoTime(+element.value)
  }

  const toggleMute = () => {
    setIsMuted(curr => {
      if ( mediaElementRef.current === null ) return curr;
      mediaElementRef.current.volume = !curr ? 0 : volume;
      return !curr;
    })
  };

  const onVideoSetVolume = ( e: ChangeEvent ) => {
    const element = e.target as HTMLInputElement;
    setVolume(+element.value);
    if ( !isMuted && mediaElementRef.current  !== null ) {
      mediaElementRef.current.volume = +element.value;
    }
  }

  //** useEffect hooks **//
  useEffect(() => {  // invoked when video is playing
    if( isPlaying ) {
      isPlayingInterval.current = setInterval(() => {
        setCurrentMediaTime( current => {
          const newTime = +(current + .01).toFixed(2);

          if ( newTime < mediaLength ) {
            return newTime;
          } else {
            setIsPlaying(false);
            mediaElementRef.current && mediaElementRef.current.pause();
            isPlayingInterval.current && clearInterval(isPlayingInterval.current);
            return current;
          }
        });
      }, 10 );
    } else {
      isPlayingInterval.current && clearInterval(isPlayingInterval.current);
    }
  }, [ isPlaying, mediaLength, mediaElementRef ]);


  return ({
    togglePlay,
    onVideoSetTime,
    toggleMute,
    onVideoSetVolume,
    mediaLength,
    currentMediaTime,
    isPlaying,
    volume,
    isMuted,
  });
};

export default useMediaPlayer;