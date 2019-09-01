import React from 'react';
import { ESortingTypes } from '../../enums/enums';
import './Sorting.scss';

interface ISortingProps {
  onChange: (sorting: ESortingTypes) => void;
}

export const Sorting = (props: ISortingProps) => {
  const [sorting, setSorting] = React.useState(ESortingTypes.PRICE);

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSorting(event.target.value as ESortingTypes);
    props.onChange(event.target.value as ESortingTypes);
  };

  return (
    <div className='sorting'>
      <select name='sorting-select' value={sorting} onChange={onChange}>
        <option value={ESortingTypes.PRICE}>по возрастанию цены</option>
        <option value={ESortingTypes.POPULAR}>по популярности</option>
      </select>
    </div>
  );
};
