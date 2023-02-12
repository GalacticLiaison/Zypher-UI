import { useState } from "react";

interface IMutationDescriptionProps {
  item: any;
}

export const MutationDescription = (props: IMutationDescriptionProps) => {
  const [item, setItem] = useState(props.item);

  return <div>I am a MutationDescription component</div>;
};
