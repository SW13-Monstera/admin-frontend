import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { dataApiWrapper } from '../../../api/wrapper/data/dataApiWrapper';
import { useFilter } from '../../../hooks/useFilter';
import { useTable } from '../../../hooks/useTable';
import { URL, URLWithParam } from '../../../constants/url';
import { useQuery } from 'react-query';
import { IDataListResponse } from '../../../types/data/api';
import { DataListPageTemplate } from '../DataListPageTemplate';
import { validatingDataTableHeads } from '../../../constants/tableHeads';

export const ValidatingDataListPage = () => {
  const filterHandler = useFilter();
  const { page, handleChangePage, handleRowClick, params } = useTable(
    filterHandler.filterState,
    URLWithParam.DATA_VALIDATING,
  );
  const { data } = useQuery<IDataListResponse>(
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
      <Link to={URL.VALIDATING_DATA_LIST}>
        <Button variant='outlined' disabled>
          전체 검수 시작
        </Button>
      </Link>
    </DataListPageTemplate>
  );
};
