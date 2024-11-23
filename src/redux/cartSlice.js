import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk('cart/fetchCart', async (token) => {
    const { data } = await axios('http://localhost:8080/cart', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return data; 
});

export const fetchAddToCart = createAsyncThunk(
  'cart/fetchAddToCart',
  async (productId, quantity, token) => {
    const {data} = await axios.post(
      `http://localhost:8080/cart/add?productId=${productId}&quantity=${quantity}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    return data;
  }
);

export const updateQuantity = createAsyncThunk('cart/updateQuantity', async ({id, newQuantity, token}) => {
        const formData = new FormData();
        formData.append('productId', parseInt(id));
        formData.append('quantity', parseInt(newQuantity));

        const response = await axios.put('http://localhost:8080/cart/update', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }
    );
        // Devolver los datos necesarios para actualizar el estado
        return response.data;
    }
);

export const fetchRemove = createAsyncThunk('cart/fetchRemove', async ({ productId, token }) => {
    const formData = new FormData();
    formData.append('productId', parseInt(productId));

    const params = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
        params.append(key, value);
    }

    const { data } = await axios.delete('http://localhost:8080/cart/remove', 
        {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: params, // Pasar los datos como parámetros de consulta
        }
    );
    return data;
});


const cartSlice = createSlice({
    name : 'cart',
    initialState:{
        items: [],
        loading : false,
        error: null
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCart.fulfilled, (state,action) => {
            state.loading = false;
            state.items = action.payload.productsCart || [];
        })
        .addCase(fetchCart.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        //add to cart
        .addCase(fetchAddToCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAddToCart.fulfilled, (state,action) => {
            state.loading = false;
            state.items = [...state.items, action.payload]
        })
        .addCase(fetchAddToCart.rejected, (state,action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        //UPDATE
        .addCase(updateQuantity.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateQuantity.fulfilled, (state, action) => {
            const { product_id, quantity } = action.payload;
            state.items = state.items.map((item) =>
                item.product_id === product_id
                    ? { ...item, quantity: quantity }
                    : item
            );
            state.loading = false;
        })
        .addCase(updateQuantity.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        //REMOVE
        .addCase(fetchRemove.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchRemove.fulfilled, (state, action) => {
            state.loading = false;
            const removedProductId = action.meta.arg.productId;
            state.items = state.items.filter(item => item.product_id !== removedProductId);
        })
        .addCase(fetchRemove.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
})

export default cartSlice.reducer;