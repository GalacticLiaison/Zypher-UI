import { ContentType, ContentTypeName } from "../ContentShowcase";
import { GeneCard } from "../../../GenePod/components/GeneCard/GeneCard";
import { Gene } from "../../../../services/gene-service";
import { MutationCard } from "../../../GenePod/components/StableMutations/MutationCard/MutationCard";
import { Mutation } from "../../../../services/mutation-service";
import { Perk } from "../../../../services/character-service/Character";
import { PerkCard } from "../../../Player/components/PlayerPerks/PerkCard";

export const determineContentItem = (contentType: ContentTypeName) => {
  switch (contentType) {
    case "Gene":
      return (
        gene?: ContentType,
        isEdit?: boolean,
        updateProperty?: <T>(propertyName: keyof T, value: any) => void,
        updateImage?: (image: string) => void
      ) => (
        <GeneCard
          gene={gene as Gene}
          isEdit={isEdit}
          updateGeneProperty={updateProperty}
          updateImage={updateImage}
        ></GeneCard>
      );
    case "Mutation":
      return (
        mutation?: ContentType,
        isEdit?: boolean,
        updateProperty?: <T>(propertyName: keyof T, value: any) => void,
        updateImage?: (image: string) => void
      ) => (
        <MutationCard
          mutation={mutation as Mutation}
          isEdit={isEdit}
          updateMutationProperty={updateProperty}
          updateImage={updateImage}
        ></MutationCard>
      );
    case "Perk":
      return (perk?: ContentType, isEdit?: boolean) => (
        <PerkCard perk={perk as Perk} isEdit={isEdit}></PerkCard>
      );
    default:
      throw new Error("Invalid content type");
  }
};
