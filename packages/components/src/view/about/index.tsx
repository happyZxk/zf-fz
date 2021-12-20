import { Button } from "@arco-design/web-react";
import React from "react";

const About = ({ history }) => {
  return (
    <div>
      About
      <Button
        onClick={() => {
          history.push("/");
        }}
      >
        GO TO HOME
      </Button>
    </div>
  );
};

export default About;
