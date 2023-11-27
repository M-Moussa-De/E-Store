<<<<<<< HEAD
import { Backdrop, Box, CircularProgress } from "@mui/material";

export default function LoadingComponent() {
  return (
    <Backdrop open={true} invisible={true}>
        <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
            <CircularProgress size={100} color='secondary'>
                
            </CircularProgress>
        </Box>
=======
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

interface Props {
    message?: string;
}

export default function LoadingComponent({message = 'Loading...'}: Props) {
  return (
    <Backdrop open={true} invisible={true}>
       <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
        <CircularProgress size={30} />
         <Typography variant='h5' color='grey' fontSize='0.8rem' sx={{justifyContent: 'center', position: 'fixed', top: '55%'}}>{message}</Typography>
       </Box>
>>>>>>> 93ccb80ba1097fcdc10f8a4b4167202559a6dc62
    </Backdrop>
  )
}
