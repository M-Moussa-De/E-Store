import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Skeleton,
} from "@mui/material";

export default function ProductCardSkeleton() {
  return (
    <Grid item xs component={Card}>
      <CardHeader
        avatar={
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
            sx={{ bgcolor: "#F7FAFC" }}
          />
        }
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            sx={{ mb: 6, bgcolor: "#F7FAFC" }}
          />
        }
      />
      <Skeleton sx={{ height: 190, bgcolor: "#F7FAFC" }} animation="wave" variant="rectangular" />
      <CardContent>
        <>
          <Skeleton animation="wave" height={10} sx={{ mb: 6, bgcolor: "#F7FAFC" }} />
          <Skeleton animation="wave" height={10} width="80%" sx={{bgcolor: "#F7FAFC"}} />
        </>
      </CardContent>
      <CardActions>
        <>
          <Skeleton animation="wave" height={10} width="40%" sx={{bgcolor: "F7FAFC"}} />
          <Skeleton animation="wave" height={10} width="20%" sx={{bgcolor: "F7FAFC"}} />
        </>
      </CardActions>
    </Grid>
  );
}
