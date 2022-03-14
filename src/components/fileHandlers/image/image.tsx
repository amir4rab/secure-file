/* eslint-disable @next/next/no-img-element */
import { useRef } from 'react';
import useFullscreen from '@/hooks/useFullscreen';
import { IoExpand, IoContract } from 'react-icons/io5';

interface Props {
  url: string;
  alt?: string;
  className?: string;
  style?: {};
};

import styles from './image.module.scss';

function ImageComponent({ url, alt='', className='', style={} }: Props) {
  const wrapperElement = useRef< null | HTMLDivElement >(null)
  const { toggle: toggleScreen, isFullscreen } = useFullscreen(wrapperElement);

  return (
    <div ref={ wrapperElement } className={[ className, styles.imageWrapper ].join(' ')} style={ style }>
      <img
        style={{ maxWidth: '100%' }}
        src={ url }
        alt={ alt }
      />
      <div className={ styles.controls }>
      <div className={ styles.row }>
          <button data-testid='screenToggle' aria-label={ isFullscreen ? 'full screen' : 'exit full screen' } onClick={ toggleScreen }>
            { !isFullscreen ? <IoExpand /> : <IoContract /> }
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageComponent