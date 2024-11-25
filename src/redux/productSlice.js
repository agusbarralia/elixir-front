//En los slices se administra el estado relacionado a una entidad especifica, en este caso productos

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductsCategory = createAsyncThunk('products/fetchProductsCategory', async (category) => { //Obtener todos los productos de una categoria
    const {data} = await axios(`http://localhost:8080/products/category?categoryName=${category}`) //obtenemos todos los productos, el await devuelve una promesa
    return data
 });

export const fetchProductById = createAsyncThunk('product/fetchProductById', async (productId) => { //Obtener un producto por Id
    const { data } = await axios.get(`http://localhost:8080/products/id?id=${productId}`);
    return data;
});

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => { //Obtener todos los productos disponibles
    const { data } = await axios('http://localhost:8080/products');
    return data;
});

export const fetchDeleteProduct = createAsyncThunk('product/fetchDeleteProduct', async ({token,productId})=>{
    const formData = new FormData();
    formData.append('product_id', parseInt(productId));

    const {data} = await axios.put('http://localhost:8080/products/admin/changestate', formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return data
});

export const updateDiscount = createAsyncThunk('product/updateDiscount', async ({token,product_id,discount})=>{
    const formData = new FormData();
    formData.append('product_id', parseInt(product_id));
    formData.append('discount', discount);

    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
    
    const {data} = await axios.put('http://localhost:8080/products/admin/update/discount', formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return data
});

const productSlice = createSlice({
    name : 'products',
    initialState : {
        items: [],
        categoryItems: [],
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
            state.error = null;
        })
        .addCase(fetchProductsCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.categoryItems = action.payload //El payload son los datos que devuelve la API (servidor), por lo que guardamos todos los datos dentro de items.
        })
        .addCase(fetchProductsCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        //PRODUCTO POR ID
        .addCase(fetchProductById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProductById.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedProduct = action.payload;
        })
        .addCase(fetchProductById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        //TODOS LOS PRODUCTOS
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        //Borrar un producto
        .addCase(fetchDeleteProduct.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchDeleteProduct.fulfilled, (states, action) => {
            states.loading = false;
            const { productId } = action.payload;
            states.items = states.items.filter(item => item.productId !== productId);

        })
        .addCase(fetchDeleteProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        //Update Discount
        .addCase(updateDiscount.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateDiscount.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(updateDiscount.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
})

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer