import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { MutationCard } from "./MutationCard/MutationCard";
import { Mutation } from "../../../../services/mutation-service";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
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
            {[1, 2].map((value) => (
              <Grid item xs={6} key={value}>
                <MutationCard mutation={props.mutations[value]} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};
