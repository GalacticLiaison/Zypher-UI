import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { SaveGeneProperty } from "../../GeneCard";

interface IGeneDescriptionProps {
  isEdit?: boolean;
  description?: string;
  saveGeneDescription?: SaveGeneProperty;
}

export const GeneDescription = (props: IGeneDescriptionProps) => {
  const [isEdit, setIsEdit] = useState<boolean | undefined>(props.isEdit);
  useEffect(() => {
    if (!props.isEdit) return;
    setIsEdit(props.isEdit);
  }, [props.isEdit]);

  const [description, setDescription] = useState<string | undefined>(
    props.description
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
    if (props.saveGeneDescription)
      props.saveGeneDescription<"description">(event.target.value);
  };

  return isEdit ? (
    <TextField
      label="Gene Description"
      color="secondary"
      focused
      multiline
      rows={4}
      sx={{ marginTop: 2 }}
      onChange={handleChange}
    />
  ) : (
    <Typography variant="body2" color="text.secondary">
      {description ?? "No description yet for this gene...."}
    </Typography>
  );
};
