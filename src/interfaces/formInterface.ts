export interface IForm {
  title: string;
  inputValues: string[];
  onClickSubmit: (data) => void;
  isIcon: boolean;
}
