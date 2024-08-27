import { useState, useRef, useEffect } from "react";

const MainImage = ({ image, onImageDimensionsChange }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const imgRef = useRef(null);

  const updateDimensions = () => {
    if (imgRef.current) {
      const { width, height } = imgRef.current;
      setDimensions({ width, height });
      console.log("Updated Image Dimensions:", { width, height });
      if (onImageDimensionsChange) {
        onImageDimensionsChange({ width, height });
      }
    }
  };

  useEffect(() => {
    // Initial dimensions when the image loads
    updateDimensions();

    // Update dimensions on window resize
    window.addEventListener("resize", updateDimensions);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <div>
      <img
        ref={imgRef}
        src={image}
        alt="Example"
        onLoad={updateDimensions} // Ensure dimensions are updated when the image is loaded
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <div>
        Current Image Dimensions: {dimensions.width}px x {dimensions.height}px
      </div>
    </div>
  );
};

export default MainImage;
