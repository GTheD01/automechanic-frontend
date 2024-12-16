import { useState, useEffect } from "react";

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
  console.log(isVisible);

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-5 right-5 bg-secondary hover:bg-secondaryHover text-white border-none rounded-full py-1.5 px-3.5 text-xl"
    >
      ↑
    </button>
  );
};

export default ScrollToTopButton;
