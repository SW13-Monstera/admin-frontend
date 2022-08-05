import create from 'zustand';

interface IAuthStoreState {
  isLogin: boolean;
}

interface IFilterElement {
  standard: string;
  value: string;
}

interface IFilterState {
  longProblemFilters: IFilterElement[];
  labelingDataFilters: IFilterElement[];
  validatingDataFilters: IFilterElement[];
  doneDataFilters: IFilterElement[];

  addFilter: (filterElement: IFilterElement) => void;
  deleteFilter: (filterElement: IFilterElement) => void;
}

const useAuthStore = create((set) => ({
  isLogin: false,
  setIsLogin: () => set((state: IAuthStoreState) => ({ isLogin: !state.isLogin })),
}));

// 라벨링 시작했을 때 데이터 id값 리스트
const useLabelingDataStore = (initialDatas: number[]) =>
  create((set) => ({
    labelingDatas: [initialDatas],
    setLabelingDatas: () => set((state: number[]) => [...state]),
    resetLabelingDatas: () => set({ labelingDatas: [] }),
  }));

export { useAuthStore, useLabelingDataStore };
