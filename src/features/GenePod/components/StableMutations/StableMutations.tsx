import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { MutationCard } from "./MutationCard/MutationCard";
import { Mutation } from "../../../../services/mutation-service";
import { useEffect, useState } from "react";
import { _getAllMutations } from "../../../../api/hooks/Mutations/getAllMutations";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IStableMutationsProps {
  open: boolean;
  handleClose: any;
  mutations: Mutation[];
}

export const StableMutations = (props: IStableMutationsProps) => {
  // data from API call
  const { data, isLoading } = _getAllMutations();
  useEffect(() => {
    if (!data) return;
    setMutations(data);
  }, [data]);

  const [mutations, setMutations] = useState<Mutation[]>([] as Mutation[]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Stable Mutations
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            The following mutations are stable and can now be applied with near
            perfect consistency.
          </Typography>
          <Grid container spacing={3}>
            {mutations.map((mutation) => (
              <Grid item xs={4} key={mutation.id}>
                <MutationCard mutation={mutation} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};
