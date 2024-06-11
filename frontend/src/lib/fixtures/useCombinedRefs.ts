import { useRef, useEffect, MutableRefObject } from "react";

function useCombinedRefs<T>(
  ...refs: Array<React.Ref<T>>
): MutableRefObject<T | null> {
  const targetRef = useRef<T | null>(null);

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === "function") {
        ref(targetRef.current);
      } else if (ref) {
        (ref as MutableRefObject<T | null>).current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
}

export default useCombinedRefs;
