import type React from "react";
import type { IButton } from "../../interfaces/buttonInterface";

export const Button: React.FC<IButton> = ({
  style,
  btnText,
  handleClick,
  isHidden,
}) => {
  return (
    <button
      type="button"
      className={style}
      onClick={handleClick}
      hidden={isHidden}
    >
      {btnText}
    </button>
  );
};
