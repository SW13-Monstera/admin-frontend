export type TProblemSetListResponse = IProblemSetListElement[];

export interface IProblemSetListElement {
  id: number;
  problemCnt: number;
  name: string;
  description: string;
}
