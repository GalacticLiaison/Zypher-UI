import { PhotoCamera } from "@mui/icons-material";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import { UpdateGeneImage } from "../../GeneCard";

interface IGeneImageProps {
  image?: string;
  name?: string;
  isEdit?: boolean;
  updateGeneImage?: UpdateGeneImage;
}

export const GeneImage = (props: IGeneImageProps) => {
  const [isEdit, setIsEdit] = useState<boolean | undefined>(
    props.isEdit ?? false
  );
  useEffect(() => {
    if (!props.isEdit) return;
    setIsEdit(props.isEdit);
  }, [props.isEdit]);

  const [image, setImage] = useState<string | undefined>(props.image);
  const [name, setName] = useState<string | undefined>(props.name);

  // const classes = useStyles();
  // const [image, setImage] = useState(null);
  const style = {
    display: "none",
  };

  interface File {
    lastModified: number;
    lastModifiedDate: string;
    name: string;
    size: number;
    type: string;
    webkitRelativePath: string;
  }

  // Q: what type is event param below?
  // A: event is of type ChangeEvent<HTMLInputElement>
  const handleChange = (event: any) => {
    if (!event.target.files) return;
    const image = event.target.files[0];

    const url = URL.createObjectURL(event.target.files[0]);
    setImage(url);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", image.name);
    formData.append("subFolderName", "src/assets/genes/");

    console.log("formData:", formData);
    if (props.updateGeneImage) {
      props.updateGeneImage(formData);
    }
  };

  return (
    <div>
      {isEdit ? (
        <div>
          <input
            accept="image/*"
            style={style}
            id="icon-button-file"
            type="file"
            onChange={handleChange}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              component="span"
              aria-label="upload picture"
              edge="end"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </div>
      ) : null}

      <CardMedia
        component="img"
        // height="400"
        image={image ?? "src/assets/genes/UnknownGene.png"}
        alt={name ?? "Unknown Gene"}
      />
    </div>
  );
};
