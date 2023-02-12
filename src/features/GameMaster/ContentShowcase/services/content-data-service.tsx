import { UseQueryResult } from "@tanstack/react-query";
import { _getAllGenes } from "../../../../api/hooks/Genes/getAllGenes";
import { _saveNewGene } from "../../../../api/hooks/Genes/saveNewGene";
import { _updateGene } from "../../../../api/hooks/Genes/updateGene";
import { _saveNewImage } from "../../../../api/hooks/Image/saveNewImage";
import { _getAllMutations } from "../../../../api/hooks/Mutations/getAllMutations";
import { _saveNewMutation } from "../../../../api/hooks/Mutations/saveNewMutation";
import { _updateMutation } from "../../../../api/hooks/Mutations/updateMutation";
import { _getAllPerks } from "../../../../api/hooks/Perks/getAllPerks";
import { _saveNewPerk } from "../../../../api/hooks/Perks/saveNewPerk";
import { _updatePerk } from "../../../../api/hooks/Perks/updatePerk";
import { ContentTypeName } from "../ContentShowcase";

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

export const _saveNewContent = (contentType: ContentTypeName): (() => any) => {
  switch (contentType) {
    case "Gene":
      return _saveNewGene;
    case "Mutation":
      return _saveNewMutation;
    case "Perk":
      return _saveNewPerk;
    default:
      throw new Error("Invalid content type");
  }
};

export const _updateContent = (contentType: ContentTypeName): (() => any) => {
  switch (contentType) {
    case "Gene":
      return _updateGene;
    case "Mutation":
      return _updateMutation;
    case "Perk":
      return _updatePerk;
    default:
      throw new Error("Invalid content type");
  }
};

export const saveNewImage = (imageToUpdate: FormData) => {
  const saveNewImage = _saveNewImage();
  saveNewImage.mutate(imageToUpdate);
};
