import { IProblemListElement } from './../problem/api';
import { IShortProblemListElement } from './../problem/shortApi';
import { IDataListElement } from '../data/api';
import { ILongProblem } from '../problem/api';

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

interface ICustomTable {
  headCells: readonly HeadCell[];
  getData: (page: number, params: any) => Promise<any>;
  filterState: IFilter[];
}

interface IProblemTable extends ICustomTable {
  tableHeads: (keyof IProblemListElement)[];
}

interface IShortProblemTable extends ICustomTable {
  tableHeads: (keyof IShortProblemListElement)[];
}

interface IShortProblemTable extends ICustomTable {
  tableHeads: (keyof IShortProblemListElement)[];
}

interface IDataTable extends ICustomTable {
  tableHeads: (keyof IDataListElement)[];
}

interface IProblemCondition {
  id: string;
  title: string;
  description: string;
}

interface IDataCondition {
  id: string;
  title: string;
  content: string;
  assignedUser: string;
  validatingUser: string;
}

interface IFilter {
  condition: keyof IProblemCondition | keyof IDataCondition;
  value: string;
  id: number;
}

interface IChoice {
  id: string;
  value: string;
  isChecked: boolean;
}

export type {
  HeadCell,
  IFilter,
  IProblemCondition,
  IDataCondition,
  IChoice,
  ICustomTable,
  IProblemTable,
  IDataTable,
  IShortProblemTable,
};
