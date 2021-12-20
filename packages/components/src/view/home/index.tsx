import React from "react";
import { Button } from "@arco-design/web-react";
const Home = ({ history }) => {
  return (
    <div>
      HOME
      <Button
        type="primary"
        onClick={() => {
          history.push("/about");
        }}
      >
        GO TO ABOUT
      </Button>
    </div>
  );
};
export default Home;
