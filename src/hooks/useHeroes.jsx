import { useState, useEffect } from 'react';
import firebase from 'firebase/app';

const useHeroes = () => {
  const [heroesList, setHeroesList] = useState({loading: false, array: []});

  const db = firebase.firestore();

  useEffect(() => {
    setHeroesList({loading: true, array: []});
    db.collection("heroes").get()
      .then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setHeroesList({loading: false, array: list});
      }).catch((error) => {
        console.log(`Error from response: ${error}`);
      })
  }, [db]);

  return heroesList;
};

export default useHeroes;