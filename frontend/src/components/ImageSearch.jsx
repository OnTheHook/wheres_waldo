import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../assets/hEI7v9x.jpeg";
import ContextMenu from "./ContextMenu";
import axios from "axios";
import Timer from "./Timer";

axios.defaults.withCredentials = true;

const ImageSearch = () => {
  const [options, setOptions] = useState([]);
  const [searchComplete, setSearchComplete] = useState(false);
  const [finalTime, setFinalTime] = useState(999999);
  const navigate = useNavigate();

  const handleGameEnd = (time) => {
    setFinalTime(time);

    navigate("/score", { state: { finalTime: time } });
  };

  const handleSearchComplete = () => {
    setSearchComplete(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/locations");
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
