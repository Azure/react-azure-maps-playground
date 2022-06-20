import React from 'react';

type DescriptionProps = {
  children: React.ReactNode;
};

const Description: React.FC<DescriptionProps> = (props: DescriptionProps) => {
  return (
    <div className="description">
      <span>Description: </span>
      <br></br>
      {props.children}
    </div>
  );
};

export default Description;
