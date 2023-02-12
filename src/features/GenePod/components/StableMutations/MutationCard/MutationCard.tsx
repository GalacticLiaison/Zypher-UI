import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Chip } from "@mui/material";
import {
  Mutation,
  MutationPropertyTypes,
} from "../../../../../services/mutation-service";
import { useEffect, useState } from "react";
import {
  ContentImage,
  UpdateImage,
} from "../../../../../global-components/ContentImage/ContentImage";
import { ContentDescription } from "../../../../../global-components/ContentDescription/ContentDescription";
import { ContentName } from "../../../../../global-components/ContentName/ContentName";
import { MutationRarity } from "./components/MutationRarity/MutationRarity";

const newMutation: Mutation = {
  id: "0",
  name: "",
  description: "",
  rarity: "Common",
  geneId: "",
  strainId: "",
  discovered: false,
  image: "",
  affectedBodyPart: "",
  bodyPartMutations: [],
  appliedStatBonuses: [],
  appliedStatuses: [],
  appliedPerks: [],
  requiredMutationIds: [],
};

export type UpdateMutationProperty = (
  propertyName: keyof Mutation,
  value: MutationPropertyTypes
) => void;

interface IMutationCardProps {
  mutation?: Mutation;
  isEdit?: boolean;
  selectMutation?: (mutation: Mutation) => void;
  updateMutationProperty?: UpdateMutationProperty;
  updateImage?: UpdateImage;
}

export const MutationCard = (props: IMutationCardProps) => {
  const [mutation, setMutation] = useState<Mutation>(
    props.mutation ?? newMutation
  );
  useEffect(() => {
    if (props.mutation == undefined) return;
    setMutation(props.mutation);
  }, [props.mutation]);

  const [isEdit, setIsEdit] = useState(props.isEdit ?? false);
  useEffect(() => {
    console.log("isEdit changed", props.isEdit);
    if (props.isEdit == undefined) return;
    setIsEdit(props.isEdit);
  }, [props.isEdit]);

  const handleClick = () => {
    if (props.selectMutation == undefined) return;
    props.selectMutation(mutation);
  };

  const cardContent = (
    <>
      <ContentImage
        image={mutation?.image}
        name={mutation?.name}
        isEdit={isEdit}
        updateImage={props?.updateImage}
      ></ContentImage>
      <CardContent>
        <ContentName
          name={mutation?.name}
          isEdit={isEdit}
          updateName={props.updateMutationProperty}
          contentType="Mutation"
        ></ContentName>
        <MutationRarity rarity={mutation?.rarity}></MutationRarity>
        <ContentDescription
          isEdit={isEdit}
          description={mutation?.description}
          updateDescription={props.updateMutationProperty}
          contentType="Mutation"
        ></ContentDescription>
      </CardContent>
    </>
  );

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: 480,
        boxShadow:
          "0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)" /* Shadow */,
        overflow: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        "&::MsOverflowStyle": "none",
        "&::scrollbarWidth": "none",
      }}
      onClick={handleClick}
    >
      {isEdit ? cardContent : <CardActionArea>{cardContent}</CardActionArea>}
    </Card>
  );
};
