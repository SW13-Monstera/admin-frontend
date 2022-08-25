import { useEffect, useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROBLEM_FILTER } from '../constants/filter';
import { IFilter } from '../types/etc';
import { IProblemListRequest } from '../types/problem/api';

export const useTable = (filterState?: IFilter[], url?: (id: string) => string) => {
  const navigate = useNavigate();

  const [params, setParams] = useState<IProblemListRequest>();
  const [page, setPage] = useState(0);

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
      setParams({ ...params, page: page });
    } else {
      setParams({});
    }
  }, [page, filterState]);

  return {
    page,
    handleChangePage,
    handleRowClick,
    params,
  };
};
