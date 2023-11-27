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
    </Backdrop>
  )
}
