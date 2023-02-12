import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
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
  updatedGeneProperty?: UpdateMutationProperty;
  updatedGeneImage?: UpdateImage;
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
    if (props.isEdit == undefined) return;
    setIsEdit(props.isEdit);
  }, [props.isEdit]);

  const handleClick = () => {
    if (props.selectMutation == undefined) return;
    props.selectMutation(mutation);
  };

  const rarityColor = () => {
    switch (mutation.rarity) {
      case "Common":
        return "success";
      case "Rare":
        return "info";
      case "Epic":
        return "secondary";
      case "Legendary":
        return "warning";
    }
  };

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
      <CardActionArea>
        <ContentImage
          image={mutation?.image}
          name={mutation?.name}
          isEdit={isEdit}
          updateImage={props?.updatedGeneImage}
        ></ContentImage>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {mutation.name}
          </Typography>
          <Typography gutterBottom variant="caption" component="div">
            <Chip
              label={mutation.rarity}
              color={rarityColor()}
              variant="outlined"
            />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {mutation.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
