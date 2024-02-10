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
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <button
        type={type}
        className={className}
        value={text}
        onClick={handleClick}>
        {icon && (
          <Image src={icon} alt={alt ? alt : ""} width={16} height={16} />
        )}
        {text}
      </button>
    </>
  );
}

export default Button;

