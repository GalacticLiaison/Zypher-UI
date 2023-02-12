// import { Button, Grid } from "@mui/material";
// import { useEffect, useState } from "react";
// import { Gene, GenePropertyTypes } from "../../../services/gene-service";
// import { GeneCard } from "../../GenePod/components/GeneCard/GeneCard";
// import { Image } from "../../../api/image-api";
// import { _updateGene } from "../../../api/hooks/Genes/updateGene";
// import { _saveNewImage } from "../../../api/hooks/Image/saveNewImage";
// import { updateObject } from "../../../_utils/global-helpers";

// export type UpdateGeneImage = (image: FormData) => void;

interface IGeneDesignerProps {
  // gene?: Gene;
  // toggleSnackBar: () => void;
}

export const GeneDesigner = (props: IGeneDesignerProps) => {
  return <div>deprecated</div>;
};
//   const [gene, setGene] = useState(props.gene);
//   useEffect(() => {
//     if (props.gene == undefined) return;
//     setGene(props.gene);
//   }, [props.gene]);

//   // ----- Edit mode
//   const [isEdit, setIsEdit] = useState(false);
//   const [geneToUpdate, setGeneToUpdate] = useState<Gene | undefined>(
//     props.gene
//   );
//   const [imageToUpdate, setImageToUpdate] = useState<FormData | undefined>(
//     undefined
//   );
//   const updateGene = _updateGene();
//   const saveNewImage = _saveNewImage();
//   // ---------------

//   function updatedGeneImage(geneImage: FormData) {
//     if (imageToUpdate == undefined) return;
//     setImageToUpdate(geneImage);
//   }

//   function updatedGeneProperty(
//     propertyName: keyof Gene,
//     value: GenePropertyTypes
//   ) {
//     if (geneToUpdate == undefined) return;
//     setGeneToUpdate(updateObject(geneToUpdate, propertyName, value));
//   }

//   const toggleIsEdit = () => {
//     setIsEdit(!isEdit);
//   };

//   const saveEditedGene = () => {
//     if (geneToUpdate != undefined) updateGene.mutate(geneToUpdate);
//     if (imageToUpdate != undefined) saveNewImage.mutate(imageToUpdate);
//     setIsEdit(false);

//     props.toggleSnackBar();
//   };

//   return (
//     <Grid container spacing={2}>
//       <Grid item xs={12}>
//         <GeneCard
//           gene={gene}
//           isEdit={isEdit}
//           updatedGeneProperty={updatedGeneProperty}
//           updatedGeneImage={updatedGeneImage}
//         ></GeneCard>
//       </Grid>
//       {!isEdit && (
//         <Grid item xs={5}>
//           <Button variant="outlined" color="info" onClick={toggleIsEdit}>
//             Edit
//           </Button>
//         </Grid>
//       )}
//       {isEdit && (
//         <Grid item xs={5}>
//           <Button variant="contained" color="success" onClick={saveEditedGene}>
//             Save
//           </Button>
//         </Grid>
//       )}
//       {isEdit && (
//         <Grid item xs={5}>
//           <Button variant="contained" color="error" onClick={toggleIsEdit}>
//             Cancel
//           </Button>
//         </Grid>
//       )}
//       {!isEdit && (
//         <Grid item xs={5}>
//           <Button variant="outlined" color="error">
//             Delete
//           </Button>
//         </Grid>
//       )}
//     </Grid>
//   );
// };
