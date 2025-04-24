import React from 'react';
import Button from '../components/button/Button';
import mainBg from '../assets/images/main-bg.png';
import char from '../assets/icons/char.png';
import title from '../assets/icons/title.png';
import { useNavigate } from 'react-router-dom';
import PlayButton from '../components/button/PlayButton';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center p-6 overflow-hidden">
      <img
        src={mainBg}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 blur-xs"
      />
      <img 
        src={char} 
        alt="character" 
        className='absolute bottom-0 right-3 -z-10 w-72 h-72'  
      />

      <div className="rounded-lg p-6 z-10 flex flex-col justify-center items-center">
        <img 
          src={title} 
          alt="character" 
          className='w-3xl h-auto'  
        />

        <PlayButton size={104} onClick={() => navigate('game')} className='-mt-5'/>

        <div className='w-1/2 flex flex-row justify-between mt-12'>
          <Button text="Petunjuk" onClick={() => navigate('/instructions')} />
          <Button text="Level 1" onClick={() => navigate('/game', { state: { level: 1 } })} />
        </div>

        {/* <div className="flex flex-col gap-4 w-full max-w-xs">
          <Button text="Level 1" onClick={() => navigate('/game', { state: { level: 1 } })} />
          <Button text="Level 2" onClick={() => navigate('/game', { state: { level: 2 } })} />
          <Button text="Level 3" onClick={() => navigate('/game', { state: { level: 3 } })} />
        </div> */}
      </div>
    </div>
  );
};

export default HomePage;
