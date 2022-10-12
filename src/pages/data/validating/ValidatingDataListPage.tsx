import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { dataApiWrapper } from '../../../api/wrapper/data/dataApiWrapper';
import { useFilter } from '../../../hooks/useFilter';
import { useTable } from '../../../hooks/useTable';
import { URL, URLWithParam } from '../../../constants/url';
import { useQuery } from 'react-query';
import { IDataListRequest, IDataListResponse } from '../../../types/data/api';
import { DataListPageTemplate } from '../DataListPageTemplate';
import { validatingDataTableHeads } from '../../../constants/tableHeads';
import { useTableParams } from '../../../hooks/useTableParams';
import { AssignButton } from '../../../organisms/AssignButton';

export const ValidatingDataListPage = () => {
  const filterHandler = useFilter();
  const { page, handleChangePage, handleRowClick } = useTable(URLWithParam.DATA_VALIDATING);
  const { params } = useTableParams<IDataListRequest>(page, filterHandler.filterState);
  const { data, refetch } = useQuery<IDataListResponse>(
    ['validatingData', params],
    () => dataApiWrapper.getDataList({ ...params, isLabeled: true, isValidated: false }),
    { enabled: !!params },
  );

  return (
    <DataListPageTemplate
      title='AI 검수 데이터 리스트'
      tableHeads={validatingDataTableHeads}
      data={data}
      filterStateHandler={filterHandler}
      pageHandler={{ page: page, handleChangePage: handleChangePage }}
      handleRowClick={handleRowClick}
    >
      <AssignButton
        title='검수 담당자 할당'
        minId={0}
        maxId={1008}
        submit={(nums: number[], adminId: string) => {
          dataApiWrapper
            .assignValidatingData({ userAnswerIds: nums, assigneeId: adminId })
            .then(() => {
              refetch();
            });
        }}
      />
      <Link to={URL.VALIDATING_DATA_LIST}>
        <Button variant='outlined' disabled>
          전체 검수 시작
        </Button>
      </Link>
    </DataListPageTemplate>
  );
};
