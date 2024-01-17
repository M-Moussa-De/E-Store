import { useEffect } from "react";
import ProductList from "./ProductList";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFiltersAsync, fetchProductsAsync, productSelectors, setProductParams } from "./catalogSlice";
import { Box, Checkbox, FormControlLabel, FormGroup, Grid, Pagination, Paper, Typography } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";

const sortOptions = [
  {value: 'name', label: 'Alphabetical: A to Z'},
  {value: 'price', label: 'Price: Low to High'},
  {value: 'priceDesc', label: 'Price: High to Low'},
];

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const dispatch = useAppDispatch();
  const {productLoaded, status, filtersLoaded, brands, types, productParams} = useAppSelector(state => state.catalog); 

  useEffect(() => {
    if(!productLoaded) dispatch(fetchProductsAsync());
  }, [productLoaded, dispatch]);

  useEffect(() => {
    if(!filtersLoaded) dispatch(fetchFiltersAsync());    
  }, [filtersLoaded, dispatch]);

  if(status.includes('pending')) return <LoadingComponent message='Loading products...' />
  
  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Paper sx={{mb: 2}}>
          <ProductSearch />
        </Paper>

        <Paper sx={{mb:2, p: 2}}>
         <RadioButtonGroup
          selectedValue= {productParams.orderBy}
          options={sortOptions}
          onChange={(e: any) => dispatch(setProductParams({orderBy: e.target.value}))}
         />
        </Paper>

        <Paper sx={{mb:2, p: 2}}>
          <FormGroup>
            {brands.map(brand => (
              <FormControlLabel key={brand} control={<Checkbox />} label={brand} />
            ))}
          </FormGroup>
        </Paper>

        <Paper sx={{mb:2, p: 2}}>
          <FormGroup>
            {types.map(type => (
              <FormControlLabel key={type} control={<Checkbox />} label={type} />
            ))}
          </FormGroup>
        </Paper>
      </Grid>
      
      <Grid item xs={9}>
       <ProductList products={products} />
      </Grid>

      <Grid item xs={3} />

      <Grid item xs={9}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography>Showing 1 - 10 of 100</Typography>
            <Pagination
              color="secondary"
              size="large"
              count={10}
              page={2}
            />
        </Box>
      </Grid>
    </Grid>
  );
}
