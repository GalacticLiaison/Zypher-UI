import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { XenogenCost } from "../../../../../../../../services/gene-service";
import { XenogenType } from "../../../../../../../../services/xenogen-service";
import { XenogenBlob } from "../XenogenBlob/blob-factory";

interface IXenoTypeCostProps {
  isEdit?: boolean;
  cost?: number;
  type?: XenogenType;
  updateXenogenCost: (value: number, type: string) => void;
}

export const XenoTypeCost = (props: IXenoTypeCostProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(props.isEdit ?? false);
  useEffect(() => {
    if (!props.isEdit) return;
    setIsEdit(props.isEdit);
  }, [props.isEdit]);

  const [cost, setCost] = useState<number | undefined>(props.cost ?? 0);
  const [type, setType] = useState<XenogenType | undefined>(props.type);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (cost == undefined || !type) return;
    const newCost = parseInt(event.target.value);
    setCost(newCost);
    props.updateXenogenCost(newCost, type);
  };

  return (
    <Grid container spacing={isEdit ? 3 : 1}>
      <Grid item xs={6}>
        {isEdit ? (
          <TextField
            id="standard-number"
            label="Cost"
            type="number"
            defaultValue={cost ?? 0}
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            onChange={handleChange}
          />
        ) : (
          cost ?? 0
        )}
      </Grid>
      <Grid item xs={6}>
        <XenogenBlob type={type ?? "common"} size={25}></XenogenBlob>
      </Grid>
    </Grid>
  );
};
