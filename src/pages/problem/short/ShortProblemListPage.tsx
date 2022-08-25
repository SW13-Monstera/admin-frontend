import { URL, URLWithParam } from '../../../constants/url';
import { shortProblemApiWrapper } from '../../../api/wrapper/problem/shortProblemApiWrapper';
import { useFilter } from '../../../hooks/useFilter';
import { useTable } from '../../../hooks/useTable';
import { ProblemListPageTemplate } from '../ProblemListPageTemplate';
import { shortTableHeads } from '../../../constants/tableHeads';
import { useQuery } from 'react-query';
import { IShortProblemListResponse } from '../../../types/problem/shortApi';

export const ShortProblemListPage = () => {
  const filterHandler = useFilter();
  const { page, handleChangePage, handleRowClick, params } = useTable(
    filterHandler.filterState,
    URLWithParam.SHORT_PROBLEM_DETAIL,
  );
  const { data } = useQuery<IShortProblemListResponse>(
    ['shortProblemList', params],
    () => shortProblemApiWrapper.getShortProblemList(params),
    { enabled: !!params },
  );

  return (
    <ProblemListPageTemplate
      title='단답형 문제'
      tableHeads={shortTableHeads}
      addUrl={URL.SHORT_PROBLEM_ADD}
      data={data}
      filterStateHandler={filterHandler}
      pageHandler={{ page: page, handleChangePage: handleChangePage }}
      handleRowClick={handleRowClick}
    />
  );
};
