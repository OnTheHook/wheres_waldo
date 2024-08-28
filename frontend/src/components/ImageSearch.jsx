import { useEffect, useState, useRef } from "react";
import background from "../assets/hEI7v9x.jpeg";
import ContextMenu from "./ContextMenu";
import axios from "axios";
import Timer from "./Timer";

const ImageSearch = () => {
  const [options, setOptions] = useState([]);
  const [searchComplete, setSearchComplete] = useState(false);
  const [finalTime, setFinalTime] = useState(null);

  const handleGameEnd = (time) => {
    setFinalTime(time);
  };

  const handleSearchComplete = () => {
    setSearchComplete(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/locations", {
          withCredentials: true,
        });
        console.log(response);
        setOptions(response.data.characters);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ContextMenu
        image={background}
        options={options}
        onSearchComplete={handleSearchComplete}
      />
      <Timer onGameEnd={handleGameEnd} completeFlag={searchComplete} />
    </>
  );
};

export default ImageSearch;
