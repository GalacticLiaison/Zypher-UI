import { useState } from "react";
import { GeneCardSkeleton } from "../../../GenePod/components/GeneCard/components/GeneCardSkeleton/GeneCardSkeleton";
import { ContentTypeName } from "../ContentShowcase";

interface IContentSkeletonProps {
  contentType: ContentTypeName;
}

export const ContentSkeleton = (props: IContentSkeletonProps) => {
  const [contentType, setContentType] = useState(props.contentType);

  switch (contentType) {
    case "Gene":
      return <GeneCardSkeleton></GeneCardSkeleton>;
    default:
      return <div>I am a ContentSkeleton component</div>;
      break;
  }
};
