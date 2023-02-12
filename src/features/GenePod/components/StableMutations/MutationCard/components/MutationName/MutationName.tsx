import { useState } from "react";

interface IMutationNameProps {
  item: any;
}

export const MutationName = (props: IMutationNameProps) => {
  const [item, setItem] = useState(props.item);

  return <div>I am a MutationName component</div>;
};
