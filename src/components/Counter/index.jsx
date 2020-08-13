import React, { useState, useCallback } from 'react';

import './Counter.scss';

const Counter = ({
  value,
  maxValue = Infinity,
  modifier = '',
  onChange = (e = 0) => null
}) => {
  const [count, setCount] = useState(value || 0);

  const handleChangeMinus = useCallback(() => {
    if (count > 0) {
      setCount(count - 1);
      onChange(count - 1);
    }
  }, [count, onChange]);

  const handleChangePlus = useCallback(() => {
    if (count < maxValue) {
      setCount(count + 1);
      onChange(count + 1);
    }
  }, [count, maxValue, onChange]);

  return (
    <div className={`
      counter ${modifier ? 'counter--' + modifier : ''}
    `}>
      <button
        className="counter__changer counter__changer--minus"
        disabled={count === 0}
        title="Уменьшить"
        onClick={handleChangeMinus}
      />
      <span className="counter__value">{count}</span>
      <button
        className="counter__changer counter__changer--plus"
        disabled={count === maxValue}
        title="Увеличить"
        onClick={handleChangePlus}
      />
    </div>
  );
};

export default Counter;