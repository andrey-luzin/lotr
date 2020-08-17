import CardType from 'constants/CardType';
import damage from 'assets/imgs/cards/damage.jpeg';
import fear from 'assets/imgs/cards/fear.jpeg';
import base from 'assets/imgs/cards/base.jpeg';

/**
 * @param {string} type
 */
const getType = (type) => {
  switch(type) {
    case CardType.DAMAGE:
      return damage;
    case CardType.FEAR:
      return fear;
    case CardType.PREPARED:
      return base;
    case CardType.ITEM:
      return base;
    default:
      return base;
  }
}

export default getType;