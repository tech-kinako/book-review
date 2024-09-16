export interface IField {
  lblTitle: string;
  lblText: string | undefined;
  name: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string | undefined;
}
