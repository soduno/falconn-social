
export type SelectBoxEntry = {
  key: string;
  value: string;
};

export interface SelectBoxProps {
  entries: SelectBoxEntry[];
  state: any;
  label: string;
  name: string;
  Id?: string | undefined;
}
