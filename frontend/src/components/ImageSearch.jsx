import background from "../assets/hEI7v9x.jpeg";
import ContextMenu from "./ContextMenu";

const ImageSearch = () => {
  const options = [
    { name: "Waldo", xPercent: 55.9, yPercent: 44.1 },
    { name: "Woof", xPercent: 11.5, yPercent: 52.4 },
    { name: "Wilma", xPercent: 75.0, yPercent: 53.6 },
    { name: "Whitebeard", xPercent: 66.6, yPercent: 31.9 },
    { name: "Odlaw", xPercent: 43.8, yPercent: 33.2 },
  ];

  return (
    <>
      <ContextMenu image={background} options={options} />
    </>
  );
};

export default ImageSearch;
