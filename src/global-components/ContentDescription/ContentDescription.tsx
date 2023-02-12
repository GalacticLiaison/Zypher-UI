import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { ContentTypeName } from "../../features/GameMaster/ContentShowcase/ContentShowcase";

interface IContentDescriptionProps {
  isEdit?: boolean;
  description?: string;
  updateDescription?: any;
  contentType?: ContentTypeName;
}

export const ContentDescription = (props: IContentDescriptionProps) => {
  const [isEdit, setIsEdit] = useState<boolean | undefined>(props.isEdit);
  useEffect(() => {
    if (props.isEdit == undefined) return;
    setIsEdit(props.isEdit);
  }, [props.isEdit]);

  const [description, setDescription] = useState<string | undefined>(
    props.description
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
    if (props.updateDescription)
      props.updateDescription("description", event.target.value);
  };

  return isEdit ? (
    <TextField
      label={`${props.contentType} Description`}
      color="secondary"
      focused
      multiline
      defaultValue={description}
      rows={4}
      sx={{ marginTop: 2 }}
      onChange={handleChange}
    />
  ) : (
    <Typography variant="body2" color="text.secondary">
      {description ?? `No description yet for this ${props.contentType}....`}
    </Typography>
  );
};
