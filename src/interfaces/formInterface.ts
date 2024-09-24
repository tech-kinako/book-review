import type { FieldValues } from "react-hook-form";
export interface IForm {
  title: string;
  inputValues: string[];
  onClickSubmit: (data: FieldValues) => void;
  isIcon: boolean;
}
