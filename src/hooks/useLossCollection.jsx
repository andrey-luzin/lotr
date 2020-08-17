// кажется лишнее. чекнуть Card

import { useState, useEffect } from 'react';
import firebase from 'firebase/app';

import { DamageCollection } from 'constants/FirebaseConst';

const useLossCollection = () => {
  const [lossCard, setLossCard] = useState([]);
  const [loading, setLoading] = useState(false);

  const db = firebase.firestore();

  useEffect(() => {
    setLoading(true);
    db.collection(DamageCollection).onSnapshot(querySnapshot => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push(
            Object.assign(
              {id: doc.id},
              doc.data()
            )
          );
        });
        setLossCard(list);
        setLoading(false);
      }, error => {
        console.log(`Error from response: ${error}`);
        setLoading(false);
      });
  }, [db]);

  return {
    lossCard,
    loading
  };
};

export default useLossCollection;