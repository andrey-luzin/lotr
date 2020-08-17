import { useContext, useState, useEffect } from 'react';
import { store } from 'store/store.js';
import context from 'constants/Context';

/**
 * @param {string} id - id героя
 */
const usePlayer = (id) => {
  const [isSigned, setIsSigned] = useState(false);

  const globalState = useContext(store);
  const { state } = globalState;
  const player = state.heroId || localStorage.getItem(context.heroId);
  useEffect(() => {
    if (id === player) {
      setIsSigned(true);
    }
  }, [player, id])

  return isSigned;
};

export default usePlayer;