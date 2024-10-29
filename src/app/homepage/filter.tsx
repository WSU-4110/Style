// src/components/OptionsSelector.tsx

import React, { useState } from 'react';
import './OptionsSelector.css'; // Import CSS for styling

const OptionsSelector: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('filter1');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFilter(event.target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedItems((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="options-selector">
      <h2>Choose Your Options</h2>

      {/* Radio Button Selector for Filters */}
      <div className="options-group">
        <h3>Select a Filter:</h3>
        <label>
          <input
            type="radio"
            value="filter1"
            checked={selectedFilter === 'filter1'}
            onChange={handleFilterChange}
          />
          Filter 1
        </label>
        <label>
          <input
            type="radio"
            value="filter2"
            checked={selectedFilter === 'filter2'}
            onChange={handleFilterChange}
          />
          Filter 2
        </label>
        <label>
          <input
            type="radio"
            value="filter3"
            checked={selectedFilter === 'filter3'}
            onChange={handleFilterChange}
          />
          Filter 3
        </label>
      </div>

      {/* Checkbox Selector for Items */}
      <div className="options-group">
        <h3>Select Items:</h3>
        <label>
          <input
            type="checkbox"
            value="item1"
            checked={selectedItems.includes('item1')}
            onChange={handleCheckboxChange}
          />
          Item 1
        </label>
        <label>
          <input
            type="checkbox"
            value="item2"
            checked={selectedItems.includes('item2')}
            onChange={handleCheckboxChange}
          />
          Item 2
        </label>
        <label>
          <input
            type="checkbox"
            value="item3"
            checked={selectedItems.includes('item3')}
            onChange={handleCheckboxChange}
          />
          Item 3
        </label>
      </div>

      <div>
        <h4>Selected Filter: {selectedFilter}</h4>
        <h4>Selected Items: {selectedItems.join(', ')}</h4>
      </div>
    </div>
  );
};

export default OptionsSelector;
