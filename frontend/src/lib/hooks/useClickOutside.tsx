import React, { useCallback, useEffect, useRef } from "react";

/**
 * Custom hook for closing a modal when the user clicks outside of it
 * @param isOpen boolean
 * @param setIsOpen React.Dispatch<React.SetStateAction<boolean>>
 * @returns a ref which is passed to the element that we wish to be able to close by clicking outside
 */
function useClickOutside(
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
  const ref = useRef<HTMLElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  return { ref };
}

export default useClickOutside;

