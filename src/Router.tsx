import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { URL } from './constants/url';
import {
  LoginPage,
  DataLabelingPage,
  DoneDataDetailPage,
  ValidatingDataPage,
  LabelingDataListPage,
  ValidatingDataListPage,
  DoneDataListPage,
  LongProblemAddPage,
  LongProblemDetailPage,
  LongProblemListPage,
  LongProblemEditPage,
} from './pages';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={URL.LOGIN} element={<LoginPage />} />
        <Route path={URL.LABELING_DATA_LIST} element={<LabelingDataListPage />} />
        <Route path={URL.VALIDATING_DATA_LIST} element={<ValidatingDataListPage />} />
        <Route path={URL.DONE_DATA_LIST} element={<DoneDataListPage />} />
        <Route path={URL.DATA_LABELING} element={<DataLabelingPage />} />
        <Route path={URL.DATA_VALIDATING} element={<ValidatingDataPage />} />
        <Route path={URL.DATA_DONE} element={<DoneDataDetailPage />} />
        <Route path={URL.LONG_PROBLEM_LIST} element={<LongProblemListPage />} />
        <Route path={URL.LONG_PROBLEM_DETAIL} element={<LongProblemDetailPage />} />
        <Route path={URL.LONG_PROBLEM_ADD} element={<LongProblemAddPage />} />
        <Route path={URL.LONG_PROBLEM_EDIT} element={<LongProblemEditPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
