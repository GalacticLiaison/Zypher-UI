import { Button } from "@mui/material";

export interface IDeckProps {
  count: number;
}

export const Deck = (props: IDeckProps) => {
  return (
    <div
      style={{
        height: "9em",
        width: "6em",
        color: "black",
        backgroundColor: "burlywood",
        borderWidth: "3px",
        borderStyle: "dashed",
        borderColor: "black",
      }}
    >
      {props.count}/50
    </div>
  );
};
