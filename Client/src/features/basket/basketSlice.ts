import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/Basket";
import agent from "../../app/api/agent";

interface BasketState {
    basket: Basket | null;
    status: string;
}

const initialState: BasketState = {
    basket: null,
    status: 'idle'
}

export const addItemToBasketAsync = createAsyncThunk<Basket, {productId: number | undefined, quantity?: number}>(
    'basket/addItemToBasketAsync',
    async ({productId, quantity = 1}, thunkAPI) => {
        try {
            if(productId === undefined) return;
            return await agent.Basket.addItem(productId, quantity);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});       
        }
    }
)

export const removeBasketItemAsync = createAsyncThunk<void, {productId: number | undefined, quantity: number, name?: string}>(
    'basket/removeBasketItemAsync',
    async ({productId, quantity}, thunkAPI) => {
        try {
            if(productId === undefined) return;
            await agent.Basket.removeItem(productId, quantity);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});            
        }
    }
)

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state, action) => {
           state.basket = action.payload 
        }
    },
    extraReducers: (builder => {
        builder.addCase(addItemToBasketAsync.pending, (state, action) => {
            state.status = `pendingAddItem${action.meta.arg.productId}`;
        });
        builder.addCase(addItemToBasketAsync.fulfilled, (state, action) => {
            state.basket = action.payload;
            state.status = 'idle';

        });
        builder.addCase(addItemToBasketAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });
        builder.addCase(removeBasketItemAsync.pending, (state, action) => {
            state.status = `pendingRemoveItem${action.meta.arg.productId}${action.meta.arg.name}`;
        });
        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
            const {productId, quantity} = action.meta.arg;
            const itemIndex = state.basket?.items.findIndex((i) => i.productId === productId);
            if(itemIndex === -1 || itemIndex === undefined) return;
            state.basket!.items[itemIndex].quantity -= quantity;
            if(state.basket?.items[itemIndex].quantity === 0) state.basket.items.splice(itemIndex, 1);
            state.status = 'idle';
        });
        builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });
    })
})

export const {setBasket} = basketSlice.actions;