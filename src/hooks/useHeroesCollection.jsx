import { useState, useEffect } from 'react';
import firebase from 'firebase/app';

import { HeroesCollection } from 'constants/FirebaseConst';

const useHeroesCollection = () => {
  const [heroesList, setHeroesList] = useState([]);
  const [loading, setLoading] = useState(false);

  const db = firebase.firestore();

  useEffect(() => {
    setLoading(true);
    db.collection(HeroesCollection).onSnapshot(querySnapshot => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push(
            Object.assign(
              {id: doc.id},
              doc.data()
            )
          );
        });
        setHeroesList(list);
        setLoading(false);
      }, error => {
        console.warn(`Error from response: ${error}`);
        setLoading(false);
      });
  }, [db]);

  return {
    heroesList,
    loading
  };
};

export default useHeroesCollection;