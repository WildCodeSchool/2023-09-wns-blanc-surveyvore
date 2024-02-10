import Image from "next/image";
import { useRef } from "react";

function Button({
  icon,
  type,
  alt,
  text,
  handleClick,
  className,
}: {
  icon?: string;
  type: "submit" | "reset" | "button" | undefined;
  alt?: string;
  text: string;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className: string;
}) {
  return (
    <>
      <button
        type={type}
        className={className}
        value={text}
        onClick={handleClick}>
        {icon && <img src={icon} alt={alt ? alt : ""} />}
        {text}
      </button>
    </>
  );
}

export default Button;

