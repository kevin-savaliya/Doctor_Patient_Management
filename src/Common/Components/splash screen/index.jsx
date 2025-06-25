import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './splashscreen.scss';
import mediclogo from '../../../Assets/Logo/medic_white_text.svg';

const SplashScreen = () => {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      setFadeOut(true); 
    }, 4000);

    const timeout2 = setTimeout(() => {
      navigate('/login', { replace: true });
    }, 5000);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [navigate]);

  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
      <img src={mediclogo} alt="medic-logo" />
    </div>
  );
};

export default SplashScreen;
