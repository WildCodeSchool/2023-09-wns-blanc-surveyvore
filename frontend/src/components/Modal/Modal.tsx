import { useEffect, useRef } from "react";
import Icon from "../Icon/Icon";

function Modal({
  title,
  children,
  setIsOpen,
}: {
  title: string;
  children: JSX.Element;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  function handleClickOutside() {
    setIsOpen(false);
  }

  useEffect(() => {
    ref.current && (ref.current.style.backdropFilter = "blur(5px)");

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      ref.current && (ref.current.style.backdropFilter = "none");

      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref]);

  return (
    <div
      ref={ref}
      className="modal-background"
      role="button"
      aria-label="close modal"
      tabIndex={-1}
      onClick={handleClickOutside}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <section className="modal-header">
          <p className="text-xl text--medium">{title}</p>
          <button className="close" onClick={() => setIsOpen(false)}>
            <Icon name="cross" width="16" />
          </button>
        </section>
        {children}
      </div>
    </div>
  );
}

export default Modal;

