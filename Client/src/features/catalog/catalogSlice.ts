import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../app/models/Product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

const productAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync =  createAsyncThunk<Product[]>(
    'catalog/fetchProductsAsync',
    async () => {
        try {
            return await agent.Catalog.list();
        } catch (error) {
            console.log(error);
            return [];
        }
    }
)

export const fetchProductAsync = createAsyncThunk<Product, number>(
    'catalog/fetchProductAsync',
    async (productId, thunkAPI) => {
        try {
            return await agent.Catalog.details(productId);
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message});
        }
    }
)

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productAdapter.getInitialState({
        productLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFeatchProducts';
        })
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productLoaded = true;
        })
        builder.addCase(fetchProductsAsync.rejected, (state) => {
            state.status = 'idle';
        })
        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = 'pendingFeatchProduct';
        })
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
            state.productLoaded = true;
        })
        builder.addCase(fetchProductAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action)
        })
    }
})

export const productSelectors = productAdapter.getSelectors((state: RootState) => state.catalog);