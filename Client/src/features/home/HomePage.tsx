import { Box, Typography } from "@mui/material";
import Slider from "react-slick";

export default function HomePage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
  };

  return (
  <>
    <Slider {...settings}>
      <div>
       <img src="/images/hero1.jpg" alt="hero" style={{display: 'block', width: '100%', height: '650px', objectFit: 'cover'}} />
      </div>
      
      <div>
       <img src="/images/hero2.jpg" alt="hero" style={{display: 'block', width: '100%', height: '650px',  objectFit: 'cover'}} />
      </div>

      <div>
       <img src="/images/hero3.jpg" alt="hero" style={{display: 'block', width: '100%', height: '650px',  objectFit: 'cover'}} />
      </div>
    </Slider>

    <Box display='flex' justifyContent='center' sx={{p: 4}}>
      <Typography variant='h4' component='h1' sx={{color: 'primary.main'}}>
        Welcome to the E-Store
      </Typography>
    </Box> 
  </>
  );
}
