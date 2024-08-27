import { useState, useRef, useEffect } from "react";
import Target from "./Target";
import MainImage from "./MainImage";

const ClickMenu = ({ options, image }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const targetDimensions = useRef({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
  });
  const menuRef = useRef(null);
  const openMenuRef = useRef(false);
  const imageDimensions = useRef({ width: 0, height: 0 });
  const characters = useRef(
    options.map((option) => {
      return { ...option, found: false };
    })
  );

  const handleImageDimensionsChange = (dimensions) => {
    imageDimensions.current = dimensions;
    console.log("Received dimensions in parent:", dimensions);
  };

  const handleDimensions = (dimensions) => {
    targetDimensions.current = dimensions;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenuRef.current) {
        openMenuRef.current = false; // Reset the flag after the first click outside
      } else if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    const handleScroll = () => {
      if (isVisible) setIsVisible(false);
    };

    const handleWindowResize = () => {
      if (isVisible) setIsVisible(false);
    };
    document.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("resize", handleWindowResize);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    if (!openMenuRef.current && !menuRef.current) {
      setIsVisible(true);
      setPosition({
        x: event.clientX - 75,
        y: event.clientY - 75 + window.scrollY,
      });
      openMenuRef.current = true;
    }
  };

  const handleOptionClick = (option, characters) => {
    const coordinates = targetDimensions.current;
    const { width, height } = imageDimensions.current;
    const correct =
      coordinates.left < (option.xPercent / 100) * width - window.scrollX &&
      coordinates.right > (option.xPercent / 100) * width - window.scrollX &&
      coordinates.top < (option.yPercent / 100) * height - window.scrollY &&
      coordinates.bottom > (option.yPercent / 100) * height - window.scrollY;
    if (!option.found) option.found = correct;
    const allFound = characters.every((obj) => obj.found);
    if (allFound) alert("You found all the characters!");
    setIsVisible(false);
  };

  return (
    <div onMouseDown={handleClick} style={{ width: "100%" }}>
      <MainImage
        image={image}
        onImageDimensionsChange={handleImageDimensionsChange}
      />
      {isVisible && (
        <div
          ref={menuRef}
          style={{
            position: "absolute",
            top: position.y,
            left: position.x,
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <Target onDimensionChange={handleDimensions} />
          {characters.current.map((option, index) => (
            <div
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                handleOptionClick(option, characters.current);
              }}
              style={{
                cursor: "pointer",
                padding: "4px 8px",
                backgroundColor: "#fff",
                textDecoration: option.found ? "line-through" : "none",
              }}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClickMenu;
