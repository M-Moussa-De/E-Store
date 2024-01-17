import { TextField, debounce } from '@mui/material'
import { setProductParams } from './catalogSlice';
import { useAppSelector, useAppDispatch } from '../../app/store/configureStore';
import { useState } from 'react';

export default function ProductSearch() {
  const {productParams} = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();
  const [searchTerm, setSeachTerm] = useState(productParams.searchTerm);

  const debouncedSearch = debounce((event: any) => {
    dispatch(setProductParams({searchTerm: event.target.value}));
  }, 1000);

  return (
    <TextField
    label='Search products'
    variant='outlined'
    fullWidth
    value={searchTerm || ''}
    onChange={(event: any) => {
        setSeachTerm(event.target.value);
        debouncedSearch(event);  
    }} 
    />
  )
}