import { URL, URLWithParam } from '../../../constants/url';
import { useFilter } from '../../../hooks/useFilter';
import { multipleProblemApiWrapper } from '../../../api/wrapper/problem/multipleProblemApiWrapper';
import { useTable } from '../../../hooks/useTable';
import { useQuery } from 'react-query';
import { IProblemListData } from '../../../types/problem/api';
import { ProblemListPageTemplate } from '../ProblemListPageTemplate';
import { multipleTableHeads } from '../../../constants/tableHeads';

export const MultipleProblemListPage = () => {
  const filterHandler = useFilter();
  const { page, handleChangePage, handleRowClick, params } = useTable(
    filterHandler.filterState,
    URLWithParam.MULTIPLE_PROBLEM_DETAIL,
  );
  const { data } = useQuery<IProblemListData>(
    ['longProblemList', params],
    () => multipleProblemApiWrapper.getMultipleProblemList(params),
    { enabled: !!params },
  );

  return (
    <ProblemListPageTemplate
      title='객관식 문제'
      tableHeads={multipleTableHeads}
      addUrl={URL.MULTIPLE_PROBLEM_ADD}
      data={data}
      filterStateHandler={filterHandler}
      pageHandler={{ page: page, handleChangePage: handleChangePage }}
      handleRowClick={handleRowClick}
    />
  );
};
