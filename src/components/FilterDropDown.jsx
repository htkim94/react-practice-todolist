import { useState, useCallback } from 'react';
import './FilterDropDown.css';

export default function FilterDropDown({ filterValue, filterToDoList }) {
  const [options] = useState([
    {
      label: 'All',
      value: 'all',
    },
    {
      label: 'Completed',
      value: 'completed',
    },
    {
      label: 'Incomplete',
      value: 'incomplete',
    }
  ])

  const handleSelection = useCallback((e) => {
    filterToDoList(e.target.value)
  }, [filterToDoList])

  return (
    <select onChange={handleSelection} value={filterValue}>
      { options.map(option =>
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      )}
    </select>
  )
}