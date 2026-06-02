import React from 'react';

const FilterSlider = ({ label, min, max, step, value, onChange, displayValue }) => {
  return (
    <div className="filter__group">
      <label className="filter__label">
        {label}:{' '}
        <span className="filter__label--value">{displayValue ?? value}</span>
      </label>
      <input
        type="range"
        className="filter__slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
};

export default FilterSlider;
