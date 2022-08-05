import { useState, MouseEvent, ChangeEvent } from 'react';
import { IFilter, IProblemCondition } from '../types/etc';

export const useFilter = () => {
  const [filterState, setFilterState] = useState<IFilter[]>([]);
  const [filterId, setFilterId] = useState(0);

  function addFilterId() {
    setFilterId((prev) => prev + 1);
  }

  function addFilter() {
    setFilterState((prev) => [...prev, { id: filterId, condition: 'id', value: '' }]);
    addFilterId();
  }

  function deletetFilter(event: MouseEvent<Element, MouseEvent>) {
    const id = event.currentTarget.id;
    setFilterState((prev) => prev.filter((e) => e.id.toString() !== id));
  }

  function updateCondition(newCondition: IProblemCondition, DOMId: string) {
    setFilterState((prev) =>
      prev.map(({ id, condition, value }) =>
        id.toString() === DOMId
          ? ({ id, value, condition: newCondition } as unknown as IFilter)
          : { id, condition, value },
      ),
    );
  }

  function updateFilterValue(event: ChangeEvent<HTMLTextAreaElement>) {
    if (!event.currentTarget) return;
    const DOMId = event.currentTarget.id;
    const DOMValue = event.currentTarget.value;
    setFilterState((prev) =>
      prev.map(({ id, condition, value }) =>
        id.toString() === DOMId ? { id, value: DOMValue, condition } : { id, condition, value },
      ),
    );
  }

  return { filterState, addFilter, deletetFilter, updateCondition, updateFilterValue };
};
