import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface State {
  startCountdown: () => void;
  counter: number;
}

const useCountdown = (count: number): State => {
  const [counter, setCounter] = useState<number>(count);
  const navigate = useNavigate();
  const [startCounter, setStartCounter] = useState<boolean>(false);

  const startCountdown = () => {
    setStartCounter(true);
  };

  useEffect(() => {
    let counterMutable = counter;
    let timer: NodeJS.Timeout;

    if (startCounter) {
      setInterval(() => {
        counterMutable -= 1;
        if (counterMutable >= 0) {
          setCounter(counterMutable);
        } else {
          clearInterval(timer);
          navigate('/');
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [startCounter, counter]);

  return { startCountdown, counter };
};

export default useCountdown;
