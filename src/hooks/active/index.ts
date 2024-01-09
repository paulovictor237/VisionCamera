import { useState, useEffect } from 'react';
import { AppState } from 'react-native';

export const useActiveApp = () => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const sub = AppState.addEventListener('change', (nextState) => {
      setActive(nextState === 'active');
    });
    return () => sub.remove();
  }, []);

  return active;
};
