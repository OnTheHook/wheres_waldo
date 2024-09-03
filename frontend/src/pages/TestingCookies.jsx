import axios from "axios";

axios
  .post(
    "http://localhost:3000/endpoint",
    { data: "test" },
    {
      withCredentials: true,
    }
  )
  .then((response) => console.log(response))
  .catch((error) => console.error("Error:", error));

const TestingCookies = () => {
  return <div>TestingCookies</div>;
};

export default TestingCookies;
