import type React from "react";
import type { IButton } from "../../interfaces/buttonInterface";

export const Button: React.FC<IButton> = ({ style, btnText, handleClick }) => {
  return (
    <button type="button" className={style} onClick={handleClick}>
      {btnText}
    </button>
  );
};
