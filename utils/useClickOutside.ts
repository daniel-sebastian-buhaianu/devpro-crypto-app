import { useEffect, useRef } from "react";
type ClickOutsideCallback = () => void;

const useClickOutside = (callback: ClickOutsideCallback) => {
  const elementRef = useRef<any>();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    }
  });
  return elementRef;
}

export default useClickOutside;