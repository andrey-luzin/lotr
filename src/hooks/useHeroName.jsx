import { useContext, useState, useEffect } from 'react';
import { store } from 'store/store.js';
import context from 'constants/Context';

const useHeroName = () => {
  const [heroId, setheroId] = useState("");

  const globalState = useContext(store);
  const { state } = globalState;
  const localPlayer  = state.heroId || localStorage.getItem(context.heroId);

  useEffect(() => {
    if (localPlayer) {
      setheroId(localPlayer);
    } else {
      setheroId('');
    }
  }, [localPlayer]);

  return heroId;
};

export default useHeroName;