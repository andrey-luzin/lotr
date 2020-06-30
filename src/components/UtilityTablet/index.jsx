import React from 'react';

import CardGroup from '../CardGroup';

import CardType from 'constants/CardType';
import CardName from 'constants/CardName';

import './UtilityTablet.scss';
import { useState } from 'react';

const UtilityTablet = ({
  className
}) => {
  const [utilsIsHidden, setUilsIsHidden] = useState(false);

  const handleResize = () => {
    setUilsIsHidden(!utilsIsHidden);
  }

  return (
    <div className={
      `utility-tablet
      ${className}
      ${utilsIsHidden ? '' : 'utility-tablet--is-hidden'}`
    }>
      <div className="utility-tablet__inner">
        <CardGroup
          title={CardName.INTELLIGANCE}
          type={CardType.INTELLIGANCE}
          isNewValue
        />
        <CardGroup
          title={CardName.DAMAGE}
          type={CardType.DAMAGE}
          isNewValue
        />
        <CardGroup
          title={CardName.FEAR}
          type={CardType.FEAR}
          isNewValue
        />
        <CardGroup
          title={CardName.ADVANTAGE}
          type={CardType.ADVANTAGE}
          isNewValue
        />
        <CardGroup
          title={CardName.ADVANTAGE}
          type={CardType.ADVANTAGE}
          isNewValue
        />
        <CardGroup
          title={CardName.ADVANTAGE}
          type={CardType.ADVANTAGE}
          isNewValue
        />
        <CardGroup
          title={CardName.WEAKNESS}
          type={CardType.WEAKNESS}
          isNewValue
        />
      </div>
      <div className="utility-tablet__tools-list">
        <button className="utility-tablet__tool utility-tablet__tool--resize" onClick={handleResize} />
      </div>
    </div>
  )
}

export default UtilityTablet;