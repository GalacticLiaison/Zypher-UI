import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export const GeneCardSkeleton = () => {
  return (
    <Grid container spacing={0.5}>
      {/* // Image */}
      <Grid item xs={12}>
        <Skeleton animation="wave" variant="rounded" width={350} height={345} />
      </Grid>

      {/* // Name */}
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <Skeleton animation="wave" variant="text" width={100} height={42} />
      </Grid>
      <Grid item xs={4}></Grid>

      {/* // Cost */}
      <Grid item xs={12}>
        <Stack direction={"row"} spacing={1}>
          <div style={{ marginLeft: 15, marginRight: 20 }}>
            <Skeleton animation="wave" variant="text" width={40} height={35} />
          </div>

          <Stack direction={"row"} spacing={1}>
            <Skeleton animation="wave" variant="text" width={18} height={35} />
            <div style={{ marginTop: "5px" }}>
              <Skeleton variant="circular" width={25} height={25} />
            </div>
          </Stack>

          <Stack direction={"row"} spacing={1}>
            <Skeleton animation="wave" variant="text" width={18} height={35} />
            <div style={{ marginTop: "5px" }}>
              <Skeleton variant="circular" width={25} height={25} />
            </div>
          </Stack>
          <Stack direction={"row"} spacing={1}>
            <Skeleton animation="wave" variant="text" width={18} height={35} />
            <div style={{ marginTop: "5px" }}>
              <Skeleton variant="circular" width={25} height={25} />
            </div>
          </Stack>
          <Stack direction={"row"} spacing={1}>
            <Skeleton animation="wave" variant="text" width={18} height={35} />
            <div style={{ marginTop: "5px" }}>
              <Skeleton variant="circular" width={25} height={25} />
            </div>
          </Stack>
        </Stack>
      </Grid>

      {/* // Description */}
      <Grid item xs={12}>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={350}
          height={50}
        />
      </Grid>
    </Grid>
  );
};
