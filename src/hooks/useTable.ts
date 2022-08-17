import { useEffect, useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROBLEM_FILTER } from '../constants/filter';
import { IFilter } from '../types/etc';

export const useTable = (
  getData: (page?: number, params?: object) => void,
  filterState?: IFilter[],
  url?: (id: string) => string,
) => {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const [totalElements, setTotalElements] = useState(0);

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  function handleRowClick(id: string) {
    if (url) {
      navigate(url(id));
    }
  }

  useEffect(() => {
    if (filterState) {
      const params = Object.fromEntries(
        new Map(
          filterState.map((filter) => [
            PROBLEM_FILTER.find((e) => filter.condition === e.value)?.value,
            filter.value,
          ]),
        ),
      );
      getData(page, params);
    } else {
      getData();
    }
  }, [page, filterState]);

  return { page, data, setData, totalElements, setTotalElements, handleChangePage, handleRowClick };
};
