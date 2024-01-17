import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product, ProductParams } from "../../app/models/Product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

interface CatalogState {
    productLoaded: boolean;
    filtersLoaded: boolean;
    status: 'idle' | 'pendingFeatchProducts' | 'pendingFeatchProduct' | 'pendingFeatchFilters';
    brands: string[];
    types: string[];
    productParams: ProductParams;
}

const productAdapter = createEntityAdapter<Product>();

function getAxiosParams(productParams: ProductParams) {
    const params = new URLSearchParams();
    params.append('pageNumber', productParams.pageNumber.toString());
    params.append('pageSize', productParams.pageSize.toString());
    params.append('orderBy', productParams.orderBy);
    if(productParams.searchTerm) params.append('searchTerm', productParams.searchTerm);
    if(productParams.brands) params.append('brands', productParams.brands.toString());
    if(productParams.types) params.append('types', productParams.types.toString());
    return params;
}

export const fetchProductsAsync =  createAsyncThunk<Product[], void, {state: RootState}>(
    'catalog/fetchProductsAsync',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().catalog.productParams);
        try {
            return await agent.Catalog.list(params);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const fetchProductAsync = createAsyncThunk<Product, number>(
    'catalog/fetchProductAsync',
    async (productId, thunkAPI) => {
        try {
            return await agent.Catalog.details(productId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const fetchFiltersAsync = createAsyncThunk(
    'catalog/fetchFiltersAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Catalog.fetchFilters();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

function initParams(): ProductParams {
    return {
        orderBy: 'name',
        pageNumber: 1,
        pageSize: 6,
    }
}

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productAdapter.getInitialState<CatalogState>({
        productLoaded: false,
        filtersLoaded: false,
        status: 'idle',
        brands: [],
        types: [],
        productParams: initParams()
    }),
    reducers: {
        setProductParams: (state, action) => {
            state.productLoaded = false;
            state.productParams = {...state.productParams, ...action.payload};
        },
        resetProductParams: (state) => {
            state.productLoaded = false;
            state.productParams = initParams();
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFeatchProducts' ;
        })
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productLoaded = true;
        })
        builder.addCase(fetchProductsAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action)
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
        builder.addCase(fetchFiltersAsync.pending, (state) => {
            state.status = 'pendingFeatchFilters';
        })
        builder.addCase(fetchFiltersAsync.fulfilled, (state, action) => {
            state.brands = action.payload.brands;
            state.types = action.payload.types;
            state.status = 'idle';
            state.filtersLoaded = true;
        })
        builder.addCase(fetchFiltersAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        })
    }
})

export const productSelectors = productAdapter.getSelectors((state: RootState) => state.catalog);

export const { setProductParams, resetProductParams } = catalogSlice.actions;