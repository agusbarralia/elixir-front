//En los slides se administra el estado relacionado a una entidad especifica, en este caso productos

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (category) => {
    const {data} = await axios(`http://localhost:8080/products/category?categoryName=${category}`) //obtenemos todos los productos, el await devuelve una promesa
    return data 
}); //herramienta de redux toolkit (CreateAsyncThunk) para definir acciones que van a hacer operaciones asincronas

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
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload //El payload son los datos que devuelve la API (servidor), por lo que guardamos todos los datos dentro de items.
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
    }
})

export default productSlice.reducer