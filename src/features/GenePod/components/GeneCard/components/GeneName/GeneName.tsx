import { TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SaveGeneProperty } from "../../GeneCard";

interface IGeneNameProps {
  isEdit?: boolean;
  name?: string;
  saveGeneName?: SaveGeneProperty;
}

export const GeneName = (props: IGeneNameProps) => {
  const [isEdit, setIsEdit] = useState<boolean | undefined>(props.isEdit);
  useEffect(() => {
    if (!props.isEdit) return;
    setIsEdit(props.isEdit);
  }, [props.isEdit]);

  const [name, setName] = useState<string | undefined>(props.name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (props.saveGeneName) props.saveGeneName<"name">(event.target.value);
  };

  return isEdit ? (
    <TextField
      required
      id="standard-required"
      label="Gene Name"
      variant="standard"
      onChange={handleChange}
    />
  ) : (
    <Typography gutterBottom variant="h5" component="div">
      {name ?? "No Gene Name Assigned..."}
    </Typography>
  );
};
