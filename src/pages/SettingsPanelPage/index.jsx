import React from 'react';
import firebase from 'firebase/app';

import ButtonGroup from 'components/ButtonGroup';
import Button from 'components/Button';

import {
  DamageCollection,
  FearCollection
} from 'constants/FirebaseConst';


import './SettingsPanelPage.scss';

const SettingsPanelPage = () => {
  const db = firebase.firestore();

  const lossCardsCount = 18;

  const updateDamage = (collection) => {
    db.collection(`${collection}-discard`).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        db.collection(`${collection}-discard`).doc(doc.id).delete()
      });
    });

    db.collection(collection).get().then((snapshot) => {
      snapshot.forEach((doc) => {
        db.collection(collection).doc(doc.id).delete()
        .catch((error) => console.error('Some error: ', error))
      });
    }).then(() => {
      for (let index = 1; index <= lossCardsCount; index++) {
        db.collection(collection).add({
          id: index
        })
      };
    })
  };

  return (
    <div className="settings-panel-page">
      <ButtonGroup>
        <Button
          text="Обновить урон"
          onClick={() => updateDamage(DamageCollection)}
        />
        <Button
          text="Обновить страх"
          onClick={() => updateDamage(FearCollection)}
        />
      </ButtonGroup>
    </div>
  )
};

export default SettingsPanelPage;