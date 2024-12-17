import { useEffect, useState } from "react";

function useIsLessThan(maxWidth: number = 768) {
  const [lessThan, setIsLessThan] = useState<boolean>(
    window.innerWidth <= maxWidth
  );

  useEffect(() => {
    const handleResize = () => {
      setIsLessThan(window.innerWidth <= maxWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [maxWidth]);
  return lessThan;
}

export default useIsLessThan;
