export interface IField {
  lblTitle: string;
  lblText: string | undefined;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
