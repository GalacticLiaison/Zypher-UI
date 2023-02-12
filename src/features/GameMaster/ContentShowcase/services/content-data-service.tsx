import { UseQueryResult } from "@tanstack/react-query";
import { _getAllGenes } from "../../../../api/hooks/Genes/getAllGenes";
import { _updateGene } from "../../../../api/hooks/Genes/updateGene";
import { _saveNewImage } from "../../../../api/hooks/Image/saveNewImage";
import { _getAllMutations } from "../../../../api/hooks/Mutations/getAllMutations";
import { _updateMutation } from "../../../../api/hooks/Mutations/updateMutation";
import { _getAllPerks } from "../../../../api/hooks/Perks/getAllPerks";
import { _updatePerk } from "../../../../api/hooks/Perks/updatePerk";
import { Perk } from "../../../../services/character-service/Character";
import { Gene } from "../../../../services/gene-service";
import { Mutation } from "../../../../services/mutation-service";
import { ContentType, ContentTypeName } from "../ContentShowcase";

export const getContent = (
  contentType: ContentTypeName
): (() => UseQueryResult) => {
  switch (contentType) {
    case "Gene":
      return _getAllGenes;
    case "Mutation":
      return _getAllMutations;
    case "Perk":
      return _getAllPerks;
    default:
      throw new Error("Invalid content type");
  }
};

export const updateContent = (
  contentType: ContentTypeName,
  contentItem: ContentType
) => {
  switch (contentType) {
    case "Gene":
      const updateGene = _updateGene();
      return updateGene.mutate(contentItem as Gene);
    case "Mutation":
      const updateMutation = _updateMutation();
      return updateMutation.mutate(contentItem as Mutation);
    case "Perk":
      const updatePerk = _updatePerk();
      return updatePerk.mutate(contentItem as Perk);
    default:
      throw new Error("Invalid content type");
  }
};

export const saveNewImage = (imageToUpdate: FormData) => {
  const saveNewImage = _saveNewImage();
  saveNewImage.mutate(imageToUpdate);
};
