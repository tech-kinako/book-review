export interface IForm {
  title: string;
  inputValues: string[];
  onClickSubmit: (data: any) => void;
  isIcon: boolean;
}
