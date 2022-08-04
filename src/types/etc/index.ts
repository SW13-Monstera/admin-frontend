interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

interface IProblemCondition {
  id: string;
  title: string;
  desc: string;
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
  id: string;
}

interface IChoice {
  id: string;
  value: string;
  isChecked: boolean;
}

export type { HeadCell, IFilter, IProblemCondition, IDataCondition, IChoice };
