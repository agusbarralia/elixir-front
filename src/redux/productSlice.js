//En los slices se administra el estado relacionado a una entidad especifica, en este caso productos

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductsCategory = createAsyncThunk('products/fetchProductsCategory', async (category) => {
    const {data} = await axios(`http://localhost:8080/products/category?categoryName=${category}`) //obtenemos todos los productos, el await devuelve una promesa
    return data 
});

export const fetchProductById = createAsyncThunk('product/fetchProductById', async (productId) => {
    const { data } = await axios.get(`http://localhost:8080/products/id?id=${productId}`);
    return data;
});

const productSlice = createSlice({
    name : 'products',
    initialState : {
        items: [],
        selectedProduct: null, // Producto específico para la página de detalle
        loading : false,
        error: null
    },
    reducers:{
        clearSelectedProduct: (state) => {
            state.selectedProduct = null; // Limpia el producto seleccionado al salir de la página
        },
    },
    extraReducers: (builder) => {
        builder //3 casos del builder> pendiente - completado - rechazado.
        //TODOS LOS PRODUCTOS DE UNA CATEGORIA
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
        //PRODUCTOR POR ID
        .addCase(fetchProductById.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.selectedProduct = null
        })
        .addCase(fetchProductById.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedProduct = action.payload;
        })
        .addCase(fetchProductById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

    }
})

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer