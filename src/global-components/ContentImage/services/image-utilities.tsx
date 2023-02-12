import { ContentTypeName } from "../../../features/GameMaster/ContentShowcase/ContentShowcase";

export const determineDefaultImage = (type: ContentTypeName) => {
  const typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1);
  return `src/assets/${type}s/Unknown${typeCapitalized}.png`;
};
