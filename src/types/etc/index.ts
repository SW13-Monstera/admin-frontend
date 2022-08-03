interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

interface IFilter {
  condition: string;
  value: string;
  id: string;
}

export type { HeadCell, IFilter };
