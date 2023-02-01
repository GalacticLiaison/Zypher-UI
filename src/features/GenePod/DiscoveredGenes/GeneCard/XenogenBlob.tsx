import { XenogenType } from "../../../../services/xenogen-service";
import "./XenogenBlob.css";

interface IXenogenBlobProps {
  type: XenogenType;
  size?: number;
  animated?: boolean;
}

// export interface Xenogen {
//     standard: number;
//     rare: number;
//     epic: number;
//     legendary: number;
//   }

export const XenogenBlob = (props: IXenogenBlobProps) => {
  let gooStyles = {
    blob: {
      width: props.size ?? 200,
      height: props.size ?? 200,
      borderRadius: "50%",
      backgroundColor: "#32CD32 ",
      position: "relative" as "relative",
      animation: "none",
    },
    blobMiddle: {
      content: "",
      width: props.size ? props.size * 0.75 : 150,
      height: props.size ? props.size * 0.75 : 150,
      borderRadius: "50%",
      backgroundColor: "#7FFF00",
      position: "absolute" as "absolute",
      top: props.size ? props.size / 8 : 25,
      left: props.size ? props.size / 8 : 25,
    },
    blobCenter: {
      content: "",
      width: props.size ? props.size * 0.5 : 100,
      height: props.size ? props.size * 0.5 : 100,
      borderRadius: "50%",
      backgroundColor: "#00FF00  ",
      position: "absolute" as "absolute",
      top: props.size ? props.size / 4 : 25,
      left: props.size ? props.size / 4 : 25,
    },
  };

  if (props.animated) {
    gooStyles.blob.animation = "blob-animate 3s ease-in-out infinite";
  }

  switch (props.type) {
    case "standard":
      gooStyles.blob.backgroundColor = "#32CD32";
      gooStyles.blobMiddle.backgroundColor = "#7FFF00";
      gooStyles.blobCenter.backgroundColor = "#00FF00";
      break;
    case "rare":
      gooStyles.blob.backgroundColor = "#ADD8E6";
      gooStyles.blobMiddle.backgroundColor = "#87CEEB";
      gooStyles.blobCenter.backgroundColor = "#00BFFF";
      break;
    case "epic":
      gooStyles.blob.backgroundColor = "#FF00FF";
      gooStyles.blobMiddle.backgroundColor = "#EE82EE";
      gooStyles.blobCenter.backgroundColor = "#DA70D6";
      break;
    case "legendary":
      gooStyles.blob.backgroundColor = "#FFA500";
      gooStyles.blobMiddle.backgroundColor = "#FF8C00";
      gooStyles.blobCenter.backgroundColor = "#FF7F50";
      break;
    default:
      gooStyles.blob.backgroundColor = "lightgray";
      gooStyles.blobMiddle.backgroundColor = "white";
      gooStyles.blobCenter.backgroundColor = "black";
      break;
  }

  return (
    <div style={gooStyles.blob}>
      <div style={gooStyles.blobMiddle} />
      <div style={gooStyles.blobCenter} />
    </div>
  );
};
