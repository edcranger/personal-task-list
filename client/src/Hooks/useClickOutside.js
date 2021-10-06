import { useEffect, useRef } from "react";

const useClickOutside = (handler) => {
  const domNode = useRef();

  useEffect(() => {
    const maybeHandler = (e) => {
      if (!domNode.current.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  }, [handler]);

  return domNode;
};

export default useClickOutside;
