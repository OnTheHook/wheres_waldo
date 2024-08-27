import { useEffect, useRef } from "react";

const Target = ({ onDimensionChange }) => {
  const divRef = useRef(null);

  useEffect(() => {
    const handleGetCoordinates = () => {
      if (divRef.current) {
        const rect = divRef.current.getBoundingClientRect();
        const dimensions = {
          top: rect.top,
          left: rect.left,
          right: rect.right,
          bottom: rect.bottom,
          width: rect.width,
          height: rect.height,
        };
        onDimensionChange(dimensions);
      }
    };

    handleGetCoordinates();
  }, [onDimensionChange]);

  return (
    <div
      ref={divRef}
      style={{
        width: "50px",
        height: "50px",
        backgroundColor: "rgba(255, 0, 0, 0.13)",
        margin: "50px",
        border: "6px dashed #ffffff",
      }}
    ></div>
  );
};

export default Target;
