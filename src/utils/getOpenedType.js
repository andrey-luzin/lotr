import CardType from 'constants/CardType';
import base from 'assets/imgs/cards/base.jpeg';

/**
 * @param {string} type
 * @param {number} id
 * @param {string} role
 * @param {string} hero
 */
const getOpenedType = (type, id, role, hero) => {
  switch(type) {
    case CardType.DAMAGE:
      return `assets/cards/damages/${id}.jpeg`;
    case CardType.FEAR:
      return `assets/cards/fears/${id}.jpeg`;
    case CardType.PREPARED_BASE:
      return `assets/cards/basic/${id}.jpeg`;
    case CardType.PREPARED_HERO:
      return `assets/cards/heroes/${hero}/${id}.jpeg`;
    case CardType.PREPARED_ROLE:
      return `assets/cards/classes/${role}/${id}.jpeg`;
    case CardType.ITEM:
      return `assets/cards/items/${id}.jpeg`;
    default:
      return base;
  }
};

export default getOpenedType;