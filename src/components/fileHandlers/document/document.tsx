import styles from './document.module.scss';

interface Props {
  url: string;
  alt?: string;
  className?: string;
  style?: object;
};

function Document({ url, alt='test', className= '', style={} }: Props) {
  return (
    <div className={[ styles.documentWrapper, className ].join(' ')} style={ style }>
      <embed 
        src={ url }
        type='application/pdf'
        height="100%"
      />
    </div>
  )
}

export default Document