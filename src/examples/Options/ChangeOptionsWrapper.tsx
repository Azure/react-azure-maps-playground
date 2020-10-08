import * as React from "react";
import { useState } from "react";
import { Button } from "@material-ui/core";
import Description from "../../Layout/Description";
import ChangeOptionsExample from "./ChangeOptions";

const randomLatitude = () => Math.floor(Math.random() * (30 - 65) + 65);

const randomLongitude = () => Math.floor(Math.random() * (-80 - -120) + -120);

const ChangeOptionsWrapper: React.FC = () => {
  const [bounds, setBounds] = useState([-10, -89, 10, 90]);
  return (
    <div>
      <Description>Change options in child</Description>
      <div style={wrapperStyles.buttonContainer}>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => setBounds([
              randomLongitude(),
              randomLatitude(),
              randomLongitude(),
              randomLatitude()
          ])}
        >
          Change Bounds
        </Button>
      </div>
      <ChangeOptionsExample cameraOptions={{bounds: bounds}} />
    </div>
  );
};

export const wrapperStyles = {
  wrapper: {
    padding: "15px",
    marginTop: "15px"
  },
  buttonContainer: {
    display: "grid",
    gridAutoFlow: "column",
    gridGap: "10px",
    gridAutoColumns: "max-content",
    padding: "10px 0"
  }
};
export default ChangeOptionsWrapper;
