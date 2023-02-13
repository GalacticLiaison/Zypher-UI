import { PhotoCamera } from "@mui/icons-material";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import { ContentTypeName } from "../../features/GameMaster/ContentShowcase/ContentShowcase";
import { determineDefaultImage } from "./services/image-utilities";
import { Image } from "../../api/image-api";

export type UpdateImage = (image: Image) => void;

interface IContentImageProps {
  image?: string;
  name?: string;
  isEdit?: boolean;
  updateImage?: UpdateImage;
  contentType?: ContentTypeName;
}

export const ContentImage = (props: IContentImageProps) => {
  const [isEdit, setIsEdit] = useState<boolean | undefined>(
    props.isEdit ?? false
  );
  useEffect(() => {
    if (props.isEdit == undefined) return;
    setIsEdit(props.isEdit);
  }, [props.isEdit]);

  const [image, setImage] = useState<string | undefined>(props.image);
  const [name, setName] = useState<string | undefined>(props.name);
  const [selectedFile, setSelectedFile] = useState(null);

  // const classes = useStyles();
  // const [image, setImage] = useState(null);
  const style = {
    display: "none",
  };

  const handleChange = async (event: any) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    const base64 = (await convertBase64(file)) as string;

    console.log("file 1", file);
    console.log("base64", base64);
    // const image = event.target.files[0];

    const url = URL.createObjectURL(event.target.files[0]);
    setImage(url);

    // const formData = new FormData();
    // formData.append("image", file, file.name ?? "someImage");

    // // formData.append("subFolderName", `src/assets/${props.contentType}s/`);

    // console.log("formData:", formData);
    if (props.updateImage) {
      console.log("updateImage");
      props.updateImage({
        name: file.name,
        data: base64,
        subFolderName: `src/assets/${props.contentType}s/`,
      });
    }
  };

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
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
        image={image ?? determineDefaultImage(props.contentType ?? "Gene")}
        alt={name ?? `Unknown ${props.contentType ?? "Gene"}`}
      />
    </div>
  );
};
