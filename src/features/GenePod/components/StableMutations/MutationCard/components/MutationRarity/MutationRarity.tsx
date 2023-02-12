import { useState } from "react";

interface IMutationRarityProps {
  item: any;
}

export const MutationRarity = (props: IMutationRarityProps) => {
  const [item, setItem] = useState(props.item);

  return <div>I am a MutationRarity component</div>;
};
