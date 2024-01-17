import { useEffect } from "react";
import ProductList from "./ProductList";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";


export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const dispatch = useAppDispatch();
  const {productLoaded, status, filtersLoaded} = useAppSelector(state => state.catalog); 

  useEffect(() => {
    if(!productLoaded) dispatch(fetchProductsAsync());
  }, [productLoaded, dispatch]);

  useEffect(() => {
    if(!filtersLoaded) dispatch(fetchProductsAsync());    
  }, [filtersLoaded, dispatch]);

  if(status.includes('pending')) return <LoadingComponent message='Loading products...' />
  
  return (
    <>
      <ProductList products={products} />
    </>
  );
}
