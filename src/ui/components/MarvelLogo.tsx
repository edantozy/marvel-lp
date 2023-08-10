import { Image } from '@nextui-org/react';
import marvelLogo from '../../assets/marvel-logo.svg';

export const MarvelLogo = () => {
  return (
    <div>
        <Image src={marvelLogo} alt="Marvel Logo" style={{
            width: '150px',
            maxWidth: '400px',
            height: 'auto',
            margin: '0 auto',
            display: 'block'
        }} />
    </div>
  )
}
