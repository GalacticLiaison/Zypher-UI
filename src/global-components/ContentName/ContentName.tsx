import { TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ContentPropertyTypes } from "../../features/GameMaster/ContentShowcase/components/NewContentItem";
import {
  ContentType,
  ContentTypeName,
} from "../../features/GameMaster/ContentShowcase/ContentShowcase";

interface IContentNameProps {
  isEdit?: boolean;
  name?: string;
  updateName?: any;
  contentType?: ContentTypeName;
}

export const ContentName = (props: IContentNameProps) => {
  const [isEdit, setIsEdit] = useState<boolean | undefined>(props.isEdit);
  useEffect(() => {
    if (!props.isEdit) return;
    setIsEdit(props.isEdit);
  }, [props.isEdit]);

  const [name, setName] = useState<string | undefined>(props.name);
  useEffect(() => {
    if (!props.name) return;
    setName(props.name);
  }, [props.name]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (props.updateName) props.updateName("name", event.target.value);
  };

  return isEdit ? (
    <TextField
      required
      id="standard-required"
      label={props.contentType + " Name"}
      defaultValue={name}
      variant="standard"
      onChange={handleChange}
    />
  ) : (
    <Typography gutterBottom variant="h5" component="div">
      {name ?? `No ${props.contentType} Name Assigned...`}
    </Typography>
  );
};
