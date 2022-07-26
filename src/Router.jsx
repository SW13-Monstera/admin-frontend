import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  LoginPage,
  DataLabelingPage,
  DataListPage,
  ProblemListPage,
  ProblemDetailPage,
  ProblemAddPage,
  ProblemEditPage,
} from './pages';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/data/list' element={<DataListPage />} />
        <Route path='/data/labeling/:id' element={<DataLabelingPage />} />
        <Route path='/problem/list' element={<ProblemListPage />} />
        <Route path='/problem/detail/:id' element={<ProblemDetailPage />} />
        <Route path='/problem/add' element={<ProblemAddPage />} />
        <Route path='/problem/edit/:id' element={<ProblemEditPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
