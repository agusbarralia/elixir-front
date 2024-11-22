//En los slides se administra el estado relacionado a una entidad especifica, en este caso productos

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductsCategory = createAsyncThunk('products/fetchProductsCategory', async (category) => {
    const {data} = await axios(`http://localhost:8080/products/category?categoryName=${category}`) //obtenemos todos los productos, el await devuelve una promesa
    return data 
});

const productSlice = createSlice({
    name : 'products',
    initialState : {
        items: [],
        loading : false,
        error: null
    },
    reducers:{},
    extraReducers: (builder) => {
        builder //3 casos del builder> pendiente - completado - rechazado.
        .addCase(fetchProductsCategory.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(fetchProductsCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload //El payload son los datos que devuelve la API (servidor), por lo que guardamos todos los datos dentro de items.
        })
        .addCase(fetchProductsCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
    }
})

export default productSlice.reducer