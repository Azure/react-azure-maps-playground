import React from "react";

const Description: React.FC = ({ children }) => {
  return (
    <div className="description">
      <span>Description: </span>
      <br></br>
      {children}
    </div>
  );
};

export default Description;
