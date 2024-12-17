import { useState, useEffect } from "react";

import arrowUpIcon from "@/assets/svgs/scroll-top-arrow-up.svg";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  // Don't render the button if it's not visible
  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-5 right-5 bg-secondary hover:bg-secondaryHover text-white border-none rounded-full p-2 text-xl"
    >
      <img src={arrowUpIcon} alt="arrow up" className="w-8 h-8" />
    </button>
  );
};

export default ScrollToTopButton;
